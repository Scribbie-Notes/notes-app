import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import userRoutes from "./Routes/user.routes.js";
import noteRoutes from "./Routes/note.routes.js";

// Defined __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const Router = require("./Routes/Router");

const app = express();

app.use(express.json());

const envPath =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
dotenv.config({ path: path.resolve(__dirname, envPath) });

const { MONGO_URI } = process.env;
console.log(MONGO_URI);

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

// Connect to MongoDB
(async function () {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
})();

//new better and structured routes 
app.use(userRoutes);
app.use(noteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
