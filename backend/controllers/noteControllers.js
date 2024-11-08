import Note from "../models/noteModel.js";
import { HTTP_STATUS, MESSAGES, ERROR_MESSAGES } from "../utils/const.js";

const addNoteController = async (req, res) => {
  const { title, content, tags, background } = req.body;
  const { user } = req.user;

  if (!title || !content) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: true, message: ERROR_MESSAGES.TITLE_CONTENT_REQUIRED });
  }

  try {
    //optional check file exist or not
    const attachmentPaths = req.files?.map(
      (file) => `/uploads/${file.filename}`
    );

    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
      attachments: attachmentPaths,
      background: background || "#ffffff", // Default to white if not provided
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
};

const editNoteByIdController = async (req, res) => {
    const { noteId } = req.params;
    const { title, content, tags, isPinned, background } = req.body;
    const { user } = req.user;
    let tagsArray = [];

    if (Array.isArray(tags)) {
        tagsArray = tags;
    }
    else {
        tagsArray = tags ? JSON.parse(tags) : [];
    }

    // Validate input
    const isUpdateRequired = title || content || tags || isPinned !== undefined || background;
    if (!isUpdateRequired) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: true,
        message: ERROR_MESSAGES.PROVIDE_FIELD_TO_UPDATE,
      });
    }

    try {
      // Find the note by ID and user ID
      const note = await Note.findOne({ _id: noteId, userId: user._id });

      // Check if the note exists
      if (!note) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          error: true,
          message: ERROR_MESSAGES.NOTE_NOT_FOUND,
        });
      }

      // Update fields conditionally
      const updates = {};
      if (title) updates.title = title;
      if (content) updates.content = content;
      if (tags) updates.tags = tagsArray;
      if (isPinned !== undefined) updates.isPinned = isPinned;
      if (background) updates.background = background;

      Object.assign(note, updates); // Apply updates

      // Save the updated note
      await note.save();

      return res.status(200).json({
        error: false,
        note,
        message: MESSAGES.NOTE_UPDATED_SUCCESSFULLY,
      });
    } catch (error) {
      console.error("Error editing note:", error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        error: true,
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      });
    }
};

const updateNotesBackgroundController = async (req, res) => {
  const { noteIds, background } = req.body;
  const { user } = req.user;
  //   console.log(noteIds)
  if (
    !noteIds ||
    !Array.isArray(noteIds) ||
    noteIds.length === 0 ||
    !background
  ) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: true,
      message: ERROR_MESSAGES.PROVIDE_FIELD_TO_UPDATE,
    });
  }

  try {
    const notes = await Note.updateMany(
      { _id: { $in: noteIds }, userId: user._id }, // Find notes by IDs and user ID
      { background: background } // Update the background color
    );

    if (notes.modifiedCount === 0) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        error: true,
        message: ERROR_MESSAGES.NOTES_NOT_FOUND,
      });
    }

    return res.json({
      error: false,
      message: MESSAGES.NOTES_UPDATED_SUCCESSFULLY,
      modifiedCount: notes.modifiedCount,
    });
  } catch (error) {
    //   console.error("Error updating notes: ", error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: true, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const getAllNotesController = async (req, res) => {
  const { user } = req.user;

  try {
    // Fetch notes that belong to the user and where deleted is false, sorting by isPinned
    const notes = await Note.find({
      userId: user._id,
      deleted: false,
      isArchived: false,
    }).sort({ isPinned: -1 });

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
};

const getArchiveNotesController = async (req, res) => {
  try {
    // Use req.user directly, as the user is authenticated via the authenticationToken middleware
    const { user } = req.user;

    // Fetch archived notes that belong to the user and where deleted is false
    const notes = await Note.find({
      userId: user._id,
      deleted: false,
      isArchived: true,
    }).sort({ isPinned: -1 });

    // console.log("Archived notes:", notes);

    return res.json({
      error: false,
      notes,
      message: "Archived notes fetched successfully", // Updated the message
    });
  } catch (error) {
    console.error("Error fetching archived notes:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};

const deleteNoteByIdcontroller = async (req, res) => {
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
};

const deleteMultipleNotesController = async (req, res) => {
  const { noteIds } = req.body; // Extract the noteIds from the body
  const { user } = req.user;

  // Validate that noteIds is a non-empty array
  if (!noteIds || !Array.isArray(noteIds) || noteIds.length === 0) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: true,
      message: ERROR_MESSAGES.PROVIDE_FIELD_TO_UPDATE, // Custom error message
    });
  }

  try {
    // Delete the notes that belong to the authenticated user and match the IDs
    const result = await Note.updateMany(
      { _id: { $in: noteIds }, userId: user._id },
      { $set: { deleted: true, deletedAt: new Date() } }
    );

    // Handle case when no notes were deleted
    if (result.modifiedCount === 0) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        error: true,
        message: ERROR_MESSAGES.NOTES_NOT_FOUND,
      });
    }

    // Return success response
    return res.json({
      error: false,
      message: MESSAGES.NOTES_DELETED_SUCCESSFULLY,
      modifiedCount: result.modifiedCount, // Return number of deleted notes
    });
  } catch (error) {
    console.error("Error deleting notes:", error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: true, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const updateNotePinnedController = async (req, res) => {
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
};

const bulkUpdateNotePinnedController = async (req, res) => {
  const { noteIds, isPinned } = req.body;

  try {
    // Update multiple notes at once
    await Note.updateMany(
      { _id: { $in: noteIds } }, // Match notes with the given noteIds
      { $set: { isPinned: isPinned } } // Set isPinned value
    );

    res.status(200).json({
      message: `Notes successfully ${isPinned ? "pinned" : "unpinned"}`,
    });
  } catch (error) {
    console.error("Error updating notes:", error);
    res.status(500).json({ message: "Failed to update notes" });
  }
};

const archiveNoteController = async (req, res) => {
  const { noteIds } = req.body;

  if (!Array.isArray(noteIds) || noteIds.length === 0) {
    return res
      .status(400)
      .json({ message: "Invalid request, noteIds must be an array" });
  }

  try {
    // Update the selected notes to set isArchived to true
    await Note.updateMany(
      { _id: { $in: noteIds }, deleted: false }, // Ensure the notes are not deleted
      { $set: { isArchived: true } }
    );

    res.status(200).json({ message: "Notes archived successfully" });
  } catch (error) {
    console.error("Error archiving notes:", error);
    res.status(500).json({ message: "Failed to archive notes" });
  }
};

const searchNotesController = async (req, res) => {
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
};

const unArchiveController = async (req, res) => {
  const { noteIds } = req.body;
  if (!Array.isArray(noteIds) || noteIds.length === 0) {
    return res
      .status(400)
      .json({ message: "Invalid request, noteIds must be an array" });
  }
  try {
    // Update the selected notes to set isArchived to true
    await Note.updateMany(
      { _id: { $in: noteIds }, deleted: false }, // Ensure the notes are not deleted
      { $set: { isArchived: false } }
    );

    res.status(200).json({ message: "Notes archived successfully" });
  } catch (error) {
    console.error("Error archiving notes:", error);
    res.status(500).json({ message: "Failed to archive notes" });
  }
};

const restoreDeletedNotesController = async (req, res) => {
  const { noteIds } = req.body;
  const { user } = req.user;
  console.log(noteIds);
  if (!noteIds || !Array.isArray(noteIds) || noteIds.length === 0) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: true,
      message: ERROR_MESSAGES.PROVIDE_FIELD_TO_UPDATE,
    });
  }

  try {
    // Restore notes by setting `deleted` back to false
    const result = await Note.updateMany(
      { _id: { $in: noteIds }, userId: user._id },
      { $set: { deleted: false, deletedAt: null } }
    );

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
};

export {
  addNoteController,
  editNoteByIdController,
  updateNotesBackgroundController,
  getAllNotesController,
  getArchiveNotesController,
  deleteNoteByIdcontroller,
  deleteMultipleNotesController,
  updateNotePinnedController,
  bulkUpdateNotePinnedController,
  archiveNoteController,
  searchNotesController,
  unArchiveController,
  restoreDeletedNotesController,
};
