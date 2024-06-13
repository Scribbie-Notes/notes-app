require("dotenv").config();

const config = require("./config.json")
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);

const User = require("./models/userModel");
const Note = require("./models/noteModel");

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticationToken } = require("./utilities");
const userModel = require("./models/userModel");

app.use(express.json());

app.use(
    cors({
        origin: "https://scribbie-notes.vercel.app",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

app.options("*", cors({
    origin: "https://scribbie-notes.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));


app.get("/", (req, res) => {
    res.json({ data: "hello" });
});

// create account 
app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName) {
        return res
            .status(400)
            .json({ error: true, message: "Please enter your full name" });
    }

    if (!email) {
        return res.status(400).json({ error: true, message: "Please enter your email" });
    }

    if (!password) {
        return res.status(400).json({ error: true, message: "Please enter your password" });
    }

    const isUser = await User.findOne({ email: email });

    if (isUser) {
        return res.status(400).json({
            error: true,
            message: "User already exists",
        });
    }

    const user = new User({
        fullName,
        email,
        password
    });

    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "360000m"
    });

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Account created successfully",
    });
});

// login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ error: true, message: "Please enter your email" });
    }

    if (!password) {
        return res.status(400).json({ error: true, message: "Please enter your password" });
    }

    const userInfo = await User.findOne({ email: email })

    if (!userInfo) {
        return res.status(400).json({ message: "User not found" })
    }

    if (userInfo.email == email && userInfo.password == password) {
        const user = { user: userInfo }
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "36000m"
        });

        return res.json({
            error: false,
            message: "Login successful",
            email,
            accessToken
        });
    } else {
        return res.status(400).json({
            error: true,
            message: "Invalid credentials",
        })
    }

})

// get user
app.get("/get-user", authenticationToken, async (req, res) => {
    const { user } = req.user;

    if (!user) {
        return res.sendStatus(401);
    }

    const isUser = await User.findOne({ _id: user._id });

    return res.json({
        user: { fullName: isUser.fullName, email: isUser.email, _id: isUser._id, createdOn: isUser.createdOn },
        message: "",
    });
});


app.post("/add-note", authenticationToken, async (req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;

    if (!title) {
        return res.status(400).json({ error: true, message: "Title is required" });
    }

    if (!content) {
        return res.status(400).json({ error: true, message: "Content is required" });
    }

    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id,
        });

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note added successfully",
        });
    } catch (error) {
        console.error("Error adding note:", error); // Detailed error logging
        return res.status(500).json({ error: true, message: "Something went wrong", details: error.message });
    }
});

// edit note
app.put("/edit-note/:noteId", authenticationToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;

    if (!title && !content && !tags) {
        return res.status(400).json({ error: true, message: "Please provide at least one field to update" });
    }

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned) note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Something went wrong",
        })
    }

})

// get note
app.get("/get-all-notes", authenticationToken, async (req, res) => {
    const { user } = req.user;

    try {
        const notes = await Note.find({
            userId: user._id
        }).sort({ isPinned: -1 });

        return res.json({
            error: false,
            notes,
            message: "Notes fetched successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Something went wrong",
        });
    }
});

// delete note
app.delete("/delete-note/:noteId", authenticationToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        await Note.deleteOne({ _id: noteId, userId: user._id });

        return res.json({
            error: false,
            message: "Note deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting note:", error); // Add more detailed error logging
        return res.status(500).json({
            error: true,
            message: "Something went wrong",
            details: error.message
        });
    }
});

// update isPinned
app.put("/update-note-pinned/:noteId", authenticationToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const { user } = req.user;

    if (isPinned === undefined) {
        return res.status(400).json({ error: true, message: "Please provide isPinned field" });
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
        return res.status(500).json({
            error: true,
            message: "Something went wrong",
        });
    }
});


// search notes
app.get("/search-notes/", authenticationToken, async (req, res) => {
    const { user } = req.user;
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: true, message: "Please provide at least one field to search" });
    }

    try {
        const matchingNotes = await Note.find({
            userId: user._id,
            $or: [
                { title: { $regex: new RegExp(query, "i") } },
                { content: { $regex: new RegExp(query, "i") } }
            ],
        });

        return res.json({
            error: false,
            notes: matchingNotes,
            message: "Notes fetched successfully",
        })

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal server error",
        })
    }

})

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});

module.exports = app;