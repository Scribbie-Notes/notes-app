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
const Feedback = require("./models/feedbackModel");
const { OAuth2Client } = require("google-auth-library");
const multer = require("multer");
const { HTTP_STATUS, MESSAGES, ERROR_MESSAGES } = require("./utils/const");

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

  // fullname validations
  if(!fullName || fullName.trim()===''){
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: true, message: ERROR_MESSAGES.NAME_REQUIRED });
  }
  const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/
  if(!(nameRegex.test(fullName))){
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: true, message: ERROR_MESSAGES.INVALID_NAME_FORMAT });
  }

  // email validations
  if(!email || email.trim()===''){
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: true, message: ERROR_MESSAGES.EMAIL_REQUIRED });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)){
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: true, message: ERROR_MESSAGES.INVALID_EMAIL_FORMAT });
  }

  // password validaitons
  if(!password || password.trim()===''){
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: true, message: ERROR_MESSAGES.PASSWORD_REQUIRED });
  } 
  if(!/[A-Z]/.test(password)){
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: true, message: ERROR_MESSAGES.PASSWORD_UPPERCASE_REQUIRED });
  }
  if(!/[a-z]/.test(password)){
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: true, message: ERROR_MESSAGES.PASSWORD_LOWERCASE_REQUIRED });
  }
  if(!/[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]/.test(password)){
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: true, message: ERROR_MESSAGES.PASSWORD_SPECIAL_CHAR_REQUIRED });
  }
  if(!(password.length >= 8)){
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: true, message: ERROR_MESSAGES.PASSWORD_MIN_LENGTH });
  }

  const isUser = await User.findOne({ email });

  if (isUser) {
    return res.json({ error: true, message: ERROR_MESSAGES.USER_ALREADY_EXISTS });
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
    message: MESSAGES.USER_REGISTERED_SUCCESSFULLY,
  });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: ERROR_MESSAGES.EMAIL_PASSWORD_REQUIRED });
  }

  const userInfo = await User.findOne({ email });

  if (!userInfo || userInfo.password !== password) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });
  }

  const user = { user: userInfo };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });

  return res.json({
    error: false,
    message: MESSAGES.LOGIN_SUCCESSFUL,
    user: userInfo,
    accessToken,
  });
});

// Protected Routes
app.get("/get-user", authenticationToken, async (req, res) => {
  try {
    const { user } = req.user;
    if (!user) return res.sendStatus(HTTP_STATUS.UNAUTHORIZED);

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
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: true, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
});

// Add note
app.post("/add-note", authenticationToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;

  if (!title || !content) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: true, message: ERROR_MESSAGES.TITLE_CONTENT_REQUIRED });
  }

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });
    await note.save();

    return res.json({ error: false, note, message: MESSAGES.NOTE_ADDED_SUCCESSFULLY });
  } catch (error) {
    console.error("Error adding note: ", error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: true, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
});

// Edit note
app.put("/edit-note/:noteId", authenticationToken, async (req, res) => {
  const { noteId } = req.params;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;

  if (!title && !content && !tags) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: true,
      message: ERROR_MESSAGES.PROVIDE_FIELD_TO_UPDATE,
    });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: true, message: ERROR_MESSAGES.NOTE_NOT_FOUND });
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned !== undefined) note.isPinned = isPinned;

    await note.save();

    return res.json({
      error: false,
      note,
      message: MESSAGES.NOTE_UPDATED_SUCCESSFULLY,
    });
  } catch (error) {
    console.error("Error editing note: ", error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: true, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
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
      message: MESSAGES.NOTES_FETCHED_SUCCESSFULLY,
    });
  } catch (error) {
    console.error("Error fetching notes: ", error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: true, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
});

// Delete note
app.delete("/delete-note/:noteId", authenticationToken, async (req, res) => {
  const { noteId } = req.params;
  const { user } = req.user;

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: true, message: ERROR_MESSAGES.NOTE_NOT_FOUND });
    }

    await Note.deleteOne({ _id: noteId, userId: user._id });
    return res.json({ error: false, message: MESSAGES.NOTE_DELETED_SUCCESSFULLY });
  } catch (error) {
    console.error("Error deleting note: ", error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: true, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
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
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: true, message: ERROR_MESSAGES.PROVIDE_IS_PINNED_FIELD });
    }

    try {
      const note = await Note.findOne({ _id: noteId, userId: user._id });

      if (!note) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ error: true, message: ERROR_MESSAGES.NOTE_NOT_FOUND });
      }

      note.isPinned = isPinned;
      await note.save();

      return res.json({
        error: false,
        note,
        message: MESSAGES.NOTE_UPDATED_SUCCESSFULLY,
      });
    } catch (error) {
      console.error("Error updating note pinned: ", error);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ error: true, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  }
);

// Search notes
app.get("/search-notes/", authenticationToken, async (req, res) => {
  const { user } = req.user;
  const { query } = req.query;

  if (!query) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: true,
      message: ERROR_MESSAGES.PROVIDE_SEARCH_QUERY,
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
      message: MESSAGES.NOTES_FETCHED_SUCCESSFULLY,
    });
  } catch (error) {
    console.error("Error searching notes: ", error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: true, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
});

// Update email
app.put("/update-email", authenticationToken, async (req, res) => {
  const { user } = req.user;
  const { newEmail } = req.body;

  if (!user) {
    console.error("User not authenticated");
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: ERROR_MESSAGES.USER_NOT_AUTHENTICATED });
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
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    console.log("Email updated successfully", updatedUser);
    return res
      .status(HTTP_STATUS.OK)
      .json({ message: MESSAGES.EMAIL_UPDATED_SUCCESSFULLY, user: updatedUser });
  } catch (error) {
    console.error("Error updating email: ", error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
});

// Update phone
app.put("/update-phone", async (req, res) => {
  const { newPhone } = req.body;
  const userId = req.body.userId;

  try {
    const user = await User.findById(userId);
    if (user) {
      user.phone = newPhone;
      await user.save();
      res.status(HTTP_STATUS.OK).json({ message: MESSAGES.PHONE_UPDATED_SUCCESSFULLY });
    } else {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR, error });
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

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

      res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.PROFILE_PHOTO_UPDATED_SUCCESSFULLY,
        profilePhoto: `http://localhost:8000${profilePhotoPath}`, // Send the updated URL to the frontend
      });
    } catch (error) {
      console.error("Error updating profile photo:", error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
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
      message: MESSAGES.GOOGLE_AUTH_SUCCESSFUL,
    });
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: true, message: ERROR_MESSAGES.INVALID_GOOGLE_TOKEN });
  }
});

// feedback submit
app.post("/submit", async (req, res) => {
  const { name, email, feedback } = req.body;

  try {
    const newFeedback = new Feedback({
      name,
      email,
      feedback,
    });

    await newFeedback.save();
    res.status(HTTP_STATUS.CREATED).json({ message: MESSAGES.FEEDBACK_SUBMITTED_SUCCESSFULLY });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: ERROR_MESSAGES.FAILED_TO_SUBMIT_FEEDBACK, error });
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

module.exports = app;