const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("./models/User"); // Ensure this path is correct for your User model

const app = express();
const PORT = 8000;
const ACCESS_TOKEN_SECRET = "your_secret_key"; // Make sure to use an environment variable for production

app.use(express.json());

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/your_database_name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

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

  // Full name validations
  if (!fullName || fullName.trim() === '') {
    return res.status(400).json({ error: true, message: "Name is required" });
  }
  const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
  if (!nameRegex.test(fullName)) {
    return res.status(400).json({ error: true, message: "Invalid Name format" });
  }

  // Email validations
  if (!email || email.trim() === '') {
    return res.status(400).json({ error: true, message: "Email is required" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: true, message: "Invalid Email format" });
  }

  // Password validations
  if (!password || password.trim() === '') {
    return res.status(400).json({ error: true, message: "Password is required" });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: true, message: "Min password length should be 8" });
  }
  if (!/[A-Z]/.test(password)) {
    return res.status(400).json({ error: true, message: "Password must include at least one uppercase letter" });
  }
  if (!/[a-z]/.test(password)) {
    return res.status(400).json({ error: true, message: "Password must include at least one lowercase letter" });
  }
  if (!/[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]/.test(password)) {
    return res.status(400).json({ error: true, message: "Password must include at least one special character" });
  }

  const isUser = await User.findOne({ email });
  if (isUser) {
    return res.status(400).json({ error: true, message: "User already exists" });
  }

  const user = new User({ fullName, email, password });
  await user.save();

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

// Update email
app.put("/update-email", authenticationToken, async (req, res) => {
  const { user } = req.user;
  const { newEmail } = req.body;

  if (!newEmail || newEmail.trim() === '') {
    return res.status(400).json({ error: true, message: "New email is required" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(newEmail)) {
    return res.status(400).json({ error: true, message: "Invalid Email format" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { email: newEmail },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    return res.status(200).json({ message: "Email updated successfully", user: updatedUser });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal server error" });
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
      res.status(500).json({ message: "Failed to update profile photo" });
    }
  }
);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
