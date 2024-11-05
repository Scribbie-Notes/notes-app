import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const apiBaseUrl = import.meta.env.VITE_BACKEND_URL;

const noteActions = (getAllNotes, onClose) => {

  // Helper function to handle form data construction
  const createFormData = (noteData) => {
    const formData = new FormData();
    formData.append("title", noteData.title);
    formData.append("content", noteData.content);
    formData.append("background", noteData.background);
    formData.append("isPinned", noteData.isPinned);

    // Append tags and media files only if they exist
    noteData.tags?.forEach(tag => formData.append("tags[]", tag));
    noteData.attachments?.forEach(file => formData.append("attachments", file));
    noteData.photos?.forEach(photo => formData.append("photos", photo));
    noteData.videos?.forEach(video => formData.append("videos", video));

    return formData;
  };

  // Handle adding a new note
  const addNewNote = async (noteData) => {
    try {
      const formData = createFormData(noteData);

      const response = await axiosInstance.post(`${apiBaseUrl}/add-note`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data?.note) {
        getAllNotes();
        onClose();
        toast.success("Note added successfully");
      }
    } catch (err) {
      console.log(err, "Failed to add a note");
    }
  };

  // Handle editing an existing note
  const editNote = async (noteData) => {

    try {
      if (!noteData._id) {
        console.log("Invalid note data.");
        return;
      }

      const formData = createFormData(noteData);

      const response = await axiosInstance.put(
        `/edit-note/${noteData._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data?.note) {
        getAllNotes();
        onClose();
        toast.success("Note updated successfully");
      }
    } catch (err) {
      console.log(err, "Failed to update a note");
    }
  };

  // Handle deleting a note
  const deleteNote = async (noteId) => {
    try {
      const response = await axiosInstance.delete(
        `${apiBaseUrl}/delete-note/${noteId}`
      );

      if (response.data?.success) {
        getAllNotes();
        toast.success("Note deleted successfully");
      }
    } catch (err) {
      console.log(err, "Failed to delete the note");
    }
  };

  // Handle toggling the pinned status
  const togglePinnedStatus = async (noteId, currentStatus) => {
    try {
      const response = await axiosInstance.put(
        `${apiBaseUrl}/toggle-pin/${noteId}`,
        { isPinned: !currentStatus }
      );

      if (response.data?.note) {
        getAllNotes();
        toast.success("Pinned status updated successfully");
      }
    } catch (err) {
      console.log(err, "Failed to update pinned status");
    }
  };

  return {
    addNewNote,
    editNote,
    deleteNote,
    togglePinnedStatus,
  };
};

export default noteActions;
