import { Router } from "express";
import multer from "multer";
import { storage } from "../utils/multer.js";

import {
  contactUsMailController,
  createAccountController,
  deleteUserController,
  feedbackSubmitController,
  getCurrentAccountController,
  googleAuthController,
  loginAccountController,
  updateEmailController,
  updateFullNameController,
  updatePhoneController,
  updatePofilePhotoController,
  verifyAccountController,
} from "../controllers/user.controllers.js";

import {
  authenticationToken,
  createAccountMiddleware,
} from "../middlewares/user.middlewares.js";

const upload = multer({ storage: storage });
//upload multiple attachments files
// const uploadMultiple = multer({ storage: storage }).array("attachments", 10);

const userRoutes = Router();

userRoutes.post(
  "/create-account",
  createAccountMiddleware,
  createAccountController
);

userRoutes.get("/verify/:token", verifyAccountController);

// Login
userRoutes.post("/login", loginAccountController);

userRoutes.get("/get-user", authenticationToken, getCurrentAccountController);

userRoutes.delete("/delete-user", authenticationToken, deleteUserController);

userRoutes.put(
  "/update-fullName",
  authenticationToken,
  updateFullNameController
);

userRoutes.put("/update-email", authenticationToken, updateEmailController);

userRoutes.put("/update-phone", updatePhoneController);

userRoutes.put(
  "/update-profile-photo",
  upload.single("profilePhoto"),
  updatePofilePhotoController
);

userRoutes.post("/google-auth", googleAuthController);

userRoutes.post("/submit", feedbackSubmitController);

userRoutes.post("/contact", contactUsMailController);

export default userRoutes;
