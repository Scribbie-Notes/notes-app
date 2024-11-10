import multer from "multer";
import { Router } from "express";
import { storage } from "../utils/multer.js";
import { HTTP_STATUS, MESSAGES, ERROR_MESSAGES } from "../utils/const.js";

import { authenticationToken } from "../middlewares/user.middlewares.js";
import {
  addNoteController,
  archiveNoteController,
  bulkUpdateNotePinnedController,
  deleteMultipleNotesController,
  deleteNoteByIdcontroller,
  editNoteByIdController,
  getAllNotesController,
  getArchiveNotesController,
  searchNotesController,
  updateNotePinnedController,
  unArchiveController,
  updateNotesBackgroundController,
  viewNotesController,
  restoreDeletedNotesController
} from "../controllers/noteControllers.js";
import noteModel from "../models/noteModel.js";
import mongoose from "mongoose";

const noteRoutes = Router();

// const upload = multer({ storage: storage });
//upload multiple attachments files
const uploadMultiple = multer({ storage: storage }).array("attachments", 10);

noteRoutes.post(
  "/add-note",
  authenticationToken,
  uploadMultiple,
  addNoteController
);


noteRoutes.get("/view-note/:noteId", viewNotesController);


// Configure multer to not accept any files
const upload_note = multer().none(); // This allows only non-file data

noteRoutes.put(
  "/edit-note/:noteId",
  authenticationToken, // Ensure this middleware runs first
  upload_note, // Use the updated multer configuration
  editNoteByIdController // Your controller function
);

noteRoutes.put("/update-notes-background", authenticationToken,updateNotesBackgroundController);

noteRoutes.get("/get-all-notes", authenticationToken, getAllNotesController);

noteRoutes.get("/get-archived-notes", authenticationToken,getArchiveNotesController);

noteRoutes.delete("/delete-note/:noteId", authenticationToken, deleteNoteByIdcontroller);

noteRoutes.delete("/delete-multiple-notes", authenticationToken, deleteMultipleNotesController);

noteRoutes.put(
    "/update-note-pinned/:noteId",
    authenticationToken,
    updateNotePinnedController
);

noteRoutes.put('/bulk-update-notes-pinned', bulkUpdateNotePinnedController);

noteRoutes.put('/archive-notes',archiveNoteController);
noteRoutes.put('/un-archive-notes',unArchiveController);
noteRoutes.get("/search-notes/", authenticationToken, searchNotesController);
noteRoutes.put("/undo-delete-notes", authenticationToken, async (req, res) => {
  try {
    const { noteIds } = req.body;
    // Change this line - req.user might be structured differently
    const { user } = req.user; // or however your user ID is structured
    console.log("noteIds:", noteIds);
    if (!noteIds || !Array.isArray(noteIds) || noteIds.length === 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: true,
        message: ERROR_MESSAGES.PROVIDE_FIELD_TO_UPDATE,
      });
    }

    // Restore notes by setting `deleted` back to false
    const result = await noteModel.updateMany(
      { _id: { $in: noteIds }, userId: user._id },
      { $set: { deleted: false, deletedAt: null } }
    )

console.log("Update result:", result);

    if (result.modifiedCount === 0) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        error: true,
        message: ERROR_MESSAGES.NOTES_NOT_FOUND,
      });
    }

    return res.json({
      error: false,
      message: MESSAGES.NOTES_RESTORED_SUCCESSFULLY,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error restoring notes: ", error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: true, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
});


export default noteRoutes;
