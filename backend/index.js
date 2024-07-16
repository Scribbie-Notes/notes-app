const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const fs = require("fs");
const { authenticationToken } = require("./utilities");
const User = require("./models/userModel");
const Note = require("./models/noteModel");
const { OAuth2Client } = require("google-auth-library");
const multer = require("multer");

const envPath =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
dotenv.config({ path: path.resolve(__dirname, envPath) });

const { ACCESS_TOKEN_SECRET, MONGO_URI, GOOGLE_API_TOKEN } = process.env;
const client = new OAuth2Client(GOOGLE_API_TOKEN);

// Use cors middleware before defining any routes
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://scribbie-notes.vercel.app"]
    : ["http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // access-control-allow-credentials:true
    methods: "GET,PUT,POST,DELETE",
    optionSuccessStatus: 200,
  })
);

app.use(express.json());

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.json({ data: "hello" });
});

// Create Account
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res
      .status(400)
      .json({ error: true, message: "All fields are required" });
  }

  const isUser = await User.findOne({ email });

  if (isUser) {
    return res.json({ error: true, message: "User already exists" });
  }

  const user = new User({ fullName, email, password });
  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Successful",
  });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  const userInfo = await User.findOne({ email });

  if (!userInfo || userInfo.password !== password) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  const user = { user: userInfo };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });

  return res.json({
    error: false,
    message: "Login Successful",
    user: userInfo,
    accessToken,
  });
});

// Protected Routes
app.get("/get-user", authenticationToken, async (req, res) => {
  try {
    const { user } = req.user;
    if (!user) return res.sendStatus(401);

    const isUser = await User.findOne({ _id: user._id });
    return res.json({
      user: {
        fullName: isUser.fullName,
        email: isUser.email,
        _id: isUser._id,
        createdOn: isUser.createdOn,
      },
      message: "",
    });
  } catch (error) {
    console.error("Error fetching user: ", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
});

// Add note
app.post("/add-note", authenticationToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;

  if (!title || !content) {
    return res
      .status(400)
      .json({ error: true, message: "Title and Content are required" });
  }

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });
    await note.save();

    return res.json({ error: false, note, message: "Note added successfully" });
  } catch (error) {
    console.error("Error adding note: ", error);
    return res
      .status(500)
      .json({ error: true, message: "Something went wrong" });
  }
});

// Edit note
app.put("/edit-note/:noteId", authenticationToken, async (req, res) => {
  const { noteId } = req.params;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;

  if (!title && !content && !tags) {
    return res.status(400).json({
      error: true,
      message: "Please provide at least one field to update",
    });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned !== undefined) note.isPinned = isPinned;

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    console.error("Error editing note: ", error);
    return res
      .status(500)
      .json({ error: true, message: "Something went wrong" });
  }
});

// Get all notes
app.get("/get-all-notes", authenticationToken, async (req, res) => {
  const { user } = req.user;

  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });
    return res.json({
      error: false,
      notes,
      message: "Notes fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching notes: ", error);
    return res
      .status(500)
      .json({ error: true, message: "Something went wrong" });
  }
});

// Delete note
app.delete("/delete-note/:noteId", authenticationToken, async (req, res) => {
  const { noteId } = req.params;
  const { user } = req.user;

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    await Note.deleteOne({ _id: noteId, userId: user._id });
    return res.json({ error: false, message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note: ", error);
    return res
      .status(500)
      .json({ error: true, message: "Something went wrong" });
  }
});

// Update isPinned
app.put(
  "/update-note-pinned/:noteId",
  authenticationToken,
  async (req, res) => {
    const { noteId } = req.params;
    const { isPinned } = req.body;
    const { user } = req.user;

    if (isPinned === undefined) {
      return res
        .status(400)
        .json({ error: true, message: "Please provide isPinned field" });
    }

    try {
      const note = await Note.findOne({ _id: noteId, userId: user._id });

      if (!note) {
        return res.status(404).json({ error: true, message: "Note not found" });
      }

      note.isPinned = isPinned;
      await note.save();

      return res.json({
        error: false,
        note,
        message: "Note updated successfully",
      });
    } catch (error) {
      console.error("Error updating note pinned: ", error);
      return res
        .status(500)
        .json({ error: true, message: "Something went wrong" });
    }
  }
);

// Search notes
app.get("/search-notes/", authenticationToken, async (req, res) => {
  const { user } = req.user;
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({
      error: true,
      message: "Please provide at least one field to search",
    });
  }

  try {
    const matchingNotes = await Note.find({
      userId: user._id,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
      ],
    });

    return res.json({
      error: false,
      notes: matchingNotes,
      message: "Notes fetched successfully",
    });
  } catch (error) {
    console.error("Error searching notes: ", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
});

// Update email
app.put("/update-email", authenticationToken, async (req, res) => {
  const { user } = req.user;
  const { newEmail } = req.body;

  if (!user) {
    console.error("User not authenticated");
    return res.status(401).json({ error: "User not authenticated" });
  }

  console.log("User ID:", user._id);
  console.log("New Email:", newEmail);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { email: newEmail },
      { new: true }
    );

    if (!updatedUser) {
      console.error("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    console.log("Email updated successfully", updatedUser);
    return res
      .status(200)
      .json({ message: "Email updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating email: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/update-phone", async (req, res) => {
  const { newPhone } = req.body;
  const userId = req.body.userId;

  try {
    const user = await User.findById(userId);
    if (user) {
      user.phone = newPhone;
      await user.save();
      res.status(200).json({ message: "Phone number updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Update profile photo
app.put(
  "/update-profile-photo",
  upload.single("profilePhoto"),
  async (req, res) => {
    try {
      const userId = req.body.userId;
      const profilePhotoPath = `/uploads/${req.file.filename}`;

      // Update user's profile photo in the database
      await User.findByIdAndUpdate(userId, { profilePhoto: profilePhotoPath });

      res
        .status(200)
        .json({
          message: "Profile photo updated successfully",
          profilePhoto: profilePhotoPath,
        });
    } catch (error) {
      console.error("Error updating profile photo:", error);
      res.status(500).json({ message: "Failed to update profile photo" });
    }
  }
);

//google oauth
app.post("/google-auth", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_API_TOKEN,
    });

    const payload = ticket.getPayload();
    const userid = payload["sub"];
    const email = payload["email"];

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        fullName: payload["name"],
        email: email,
        password: "", // You might want to generate a random password or handle this differently
      });
      await user.save();
    }

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });

    res.json({
      error: false,
      user,
      accessToken,
      message: "Google authentication successful",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: true, message: "Invalid Google token" });
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

module.exports = app;
