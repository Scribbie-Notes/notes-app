const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const bcrypt = require("bcrypt");
const { HTTP_STATUS, MESSAGES, ERROR_MESSAGES } = require("./utils/const");
const sendMail = require("./mail/sendMail");
const dotenv = require("dotenv");
const path = require("path");
const { OAuth2Client } = require('google-auth-library');
const cors = require('cors');

const app = express();

const envPath =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
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

//upload multiple attachments files
const uploadMultiple = multer({ storage: storage }).array('attachments', 10); 

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware for authentication
const authenticationToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(403);

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Create Account
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  // fullname validations
  if (!fullName || fullName.trim() === "") {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: true, message: ERROR_MESSAGES.NAME_REQUIRED });
  }
  const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
  if (!nameRegex.test(fullName)) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: true, message: ERROR_MESSAGES.INVALID_NAME_FORMAT });
  }

  // email validations
  if (!email || email.trim() === "") {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: true, message: ERROR_MESSAGES.EMAIL_REQUIRED });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: true, message: ERROR_MESSAGES.INVALID_EMAIL_FORMAT });
  }

  // password validaitons
  if (!password || password.trim() === "") {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: true, message: ERROR_MESSAGES.PASSWORD_REQUIRED });
  }
  if (!/[A-Z]/.test(password)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: true,
      message: ERROR_MESSAGES.PASSWORD_UPPERCASE_REQUIRED,
    });
  }
  if (!/[a-z]/.test(password)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: true,
      message: ERROR_MESSAGES.PASSWORD_LOWERCASE_REQUIRED,
    });
  }
  if (!/[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]/.test(password)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: true,
      message: ERROR_MESSAGES.PASSWORD_SPECIAL_CHAR_REQUIRED,
    });
  }
  if (!(password.length >= 8)) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: true, message: ERROR_MESSAGES.PASSWORD_MIN_LENGTH });
  }

  const isUser = await User.findOne({ email });
  if (isUser) {
    return res.json({
      error: true,
      message: ERROR_MESSAGES.USER_ALREADY_EXISTS,
    });
  }
  
  let hashedPass;
  try {
    hashedPass = await bcrypt.hash(password, 10);  
  }
  catch(err) {
    console.log(err.message);
    return res.status(500).json({
      error: true,
      message: "Internal error",
    })
  }

  const user = new User({ fullName, email, password:hashedPass });
  await user.save();
  const expiresIn = 60 * 20;
  const token = jwt.sign({ sub: user._id, expiresIn }, ACCESS_TOKEN_SECRET);
  const url = `http://localhost:${process.env.PORT}/verify/${token}`;
  const html = `<a href="${url}">Click here to verify your account</a>`;
  sendMail(email, html);

  const accessToken = jwt.sign({ user }, ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Successful",
  });
});

app.get("/verify/:token", async (req, res) => {
  const { token } = req.params;
  if (!token) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: true, message: ERROR_MESSAGES.INVALID_TOKEN });
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const { sub: userId } = decoded;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: true, message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    user.isEmailVerified = true;
    await user.save();

    return res.json({
      error: false,
      message: MESSAGES.EMAIL_VERIFIED_SUCCESSFULLY,
    });
  } catch (error) {
    console.error("Error verifying email: ", error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: true, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: ERROR_MESSAGES.EMAIL_PASSWORD_REQUIRED });
  }

  const userInfo = await User.findOne({ email });

  if (!userInfo || !(await bcrypt.compare(password, userInfo.password))) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });
  }
  if (!userInfo.isEmailVerified) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: ERROR_MESSAGES.EMAIL_NOT_VERIFIED });
  }

  const accessToken = jwt.sign({ user: userInfo }, ACCESS_TOKEN_SECRET, {
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
app.post("/add-note", authenticationToken, uploadMultiple, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;

  if (!title || !content) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: true, message: ERROR_MESSAGES.TITLE_CONTENT_REQUIRED });
  }

  try {
    const attachmentPaths = req.files.map(file => `/uploads/${file.filename}`);

    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
      attachments: attachmentPaths, // Save paths of uploaded files
    });
    await note.save();

    return res.json({
      error: false,
      note,
      message: MESSAGES.NOTE_ADDED_SUCCESSFULLY,
    });
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
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: true, message: ERROR_MESSAGES.NOTE_NOT_FOUND });
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
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: true, message: ERROR_MESSAGES.NOTE_NOT_FOUND });
    }

    await Note.deleteOne({ _id: noteId, userId: user._id });
    return res.json({
      error: false,
      message: MESSAGES.NOTE_DELETED_SUCCESSFULLY,
    });
  } catch (error) {
    console.error("Error deleting note: ", error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: true, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
});

// delete user and its notes
app.delete("/delete-user", authenticationToken, async (req, res) => {
  try {
    // destructuring to get userID
    const {
      user: { _id: userId },
    } = req.user;
    if (!userId) {
      return res.status(400).json({ error: true, message: "User Id required" });
    }

    // deleting notes
    const deleteNotesResult = await Note.deleteMany({ userId });

    // deleting user
    const deleteUserResult = await User.findByIdAndDelete(userId);

    // checking if user doesn't exist
    if (!deleteUserResult) {
      return res.status(404).json({ error: true, message: "User not found " });
    }
    return res.json({ error: false, message: "User deleted successfully" });
  } catch (error) {
    console.log("Error while deleting user", { error });
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
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: true, message: ERROR_MESSAGES.PROVIDE_IS_PINNED_FIELD });
    }

    try {
      const note = await Note.findOne({ _id: noteId, userId: user._id });

      if (!note) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ error: true, message: ERROR_MESSAGES.NOTE_NOT_FOUND });
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

app.put("/update-fullName", authenticationToken, async (req, res) => {
  const { user } = req.user;
  const { newFullName } = req.body;

  if (!user) {
    console.error("User not authenticated");
    return res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ error: ERROR_MESSAGES.USER_NOT_AUTHENTICATED });
  }

  console.log("User ID:", user._id);
  console.log("New Full Name:", newFullName);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { fullName: newFullName },
      { new: true }
    );

    if (!updatedUser) {
      console.error("User not found");
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    console.log("Name updated successfully", updatedUser);
    return res.status(HTTP_STATUS.OK).json({
      message: MESSAGES.FULLNAME_UPDATED_SUCCESSFULLY,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating Name: ", error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
});

// Update email
app.put("/update-email", authenticationToken, async (req, res) => {
  const { user } = req.user;
  const { newEmail } = req.body;

  if (!user) {
    console.error("User not authenticated");
    return res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ error: ERROR_MESSAGES.USER_NOT_AUTHENTICATED });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(newEmail)) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid Email format" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { email: newEmail },
      { new: true }
    );

    if (!updatedUser) {
      console.error("User not found");
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    console.log("Email updated successfully", updatedUser);
    return res.status(HTTP_STATUS.OK).json({
      message: MESSAGES.EMAIL_UPDATED_SUCCESSFULLY,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating email: ", error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
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
      res
        .status(HTTP_STATUS.OK)
        .json({ message: MESSAGES.PHONE_UPDATED_SUCCESSFULLY });
    } else {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR, error });
  }
});

// Update profile photo
app.put(
  "/update-profile-photo",
  upload.single("profilePhoto"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "Profile photo is required" });
    }

    try {
      const userId = req.body.userId;
      const profilePhotoPath = `/uploads/${req.file.filename}`;

      await User.findByIdAndUpdate(userId, { profilePhoto: profilePhotoPath });

      res.status(200).json({
        message: "Profile photo updated successfully",
        profilePhoto: `http://localhost:8000${profilePhotoPath}`,
      });
    } catch (error) {
      console.error("Error updating profile photo:", error);
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
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
    res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: true, message: ERROR_MESSAGES.INVALID_GOOGLE_TOKEN });
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
    res
      .status(HTTP_STATUS.CREATED)
      .json({ message: MESSAGES.FEEDBACK_SUBMITTED_SUCCESSFULLY });
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGES.FAILED_TO_SUBMIT_FEEDBACK, error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
