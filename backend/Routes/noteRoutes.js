import multer from "multer";
import { Router } from "express";
import { storage } from "../utils/multer.js";


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
} from "../controllers/noteControllers.js";



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

noteRoutes.put(
  "/edit-note/:noteId",
  authenticationToken,
  editNoteByIdController
);

noteRoutes.put("/update-notes-background", authenticationToken);

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

noteRoutes.get("/search-notes/", authenticationToken, searchNotesController);


export default noteRoutes;