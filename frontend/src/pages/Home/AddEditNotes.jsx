import React, { useState, useEffect } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import AddAttachmentsInput from "../../components/Input/AddAttachmentInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

const AddEditNotes = ({ noteData, type, getAllNotes, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [background, setBackground] = useState("#ffffff");
  const [error, setError] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  const MAX_TITLE_LENGTH = 60;
  const MAX_CONTENT_LENGTH = 2500;

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  useEffect(() => {
    if (!SpeechRecognition) {
      setIsSpeechSupported(false);
    }
  }, []);
  if (recognition) {
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      // Append only the final transcript to the content
      if (finalTranscript) {
        setContent((prevContent) => prevContent + " " + finalTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      let errorMessage = "Speech recognition failed";

      // Customize error messages based on the error type
      switch (event.error) {
        case "no-speech":
          errorMessage = "No speech was detected. Please try again.";
          break;
        case "audio-capture":
          errorMessage = "Audio capture failed. Please check your microphone.";
          break;
        case "not-allowed":
          errorMessage = "Permission to use microphone was denied.";
          break;
        case "service-not-allowed":
          errorMessage = "Speech service is not allowed.";
          break;
        default:
          errorMessage = "An unknown error occurred.";
      }

      setError(errorMessage);
      toast.error(errorMessage);
    };
  }

  useEffect(() => {
    if (type === "edit" && noteData) {
      setTitle(noteData.title);
      setContent(noteData.content);
      setTags(noteData.tags);
      setAttachments(noteData.files || []);
      setBackground(noteData.background || "#ffffff");
      setPhotos(noteData.photos || []);
      setVideos(noteData.videos || []);
    }
  }, [type, noteData]);

  const toggleListening = () => {
    if (!isSpeechSupported) {
      toast.error("Speech recognition is not supported by your browser.");
      return;
    }
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  const handleFileUpload = (files) => {
    setAttachments((prevAttachments) => [...prevAttachments, ...files]);
  };

  const handlePhotoUpload = (files) => {
    setPhotos((prevPhotos) => [...prevPhotos, ...files]);
  };

  const handleVideoUpload = (files) => {
    setVideos((prevVideos) => [...prevVideos, ...files]);
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    if (newTitle.length <= MAX_TITLE_LENGTH) {
      setTitle(newTitle);
    }
  };
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    if (newTitle.length <= MAX_TITLE_LENGTH) {
      setTitle(newTitle);
    }
  };

  const handleContentChange = (value) => {
    if (value.length <= MAX_CONTENT_LENGTH) {
      setContent(value);
    }
  };

  const handleBackgroundChange = (e) => {
    setBackground(e.target.value);
  };
  const handleBackgroundChange = (e) => {
    setBackground(e.target.value);
  };

  const addNewNote = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("background", background);
    tags.forEach((tag) => {
      formData.append("tags[]", tag);
    });
    attachments.forEach((file) => {
      formData.append("attachments", file);
    });
    photos.forEach((photo) => {
      formData.append("photos", photo);
    });
    videos.forEach((video) => {
      formData.append("videos", video);
    });

    try {
      const response = await axiosInstance.post("/add-note", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
        toast.success("Note added successfully");
      }
    } catch (error) {
      console.error("Error adding note:", error);
      setError("An error occurred while adding the note.");
      toast.error("Failed to add a note");
    }
  };

  const editNote = async () => {
    try {
      if (!noteData || !noteData._id) {
        setError("Invalid note data.");
        return;
      }
  const editNote = async () => {
    try {
      if (!noteData || !noteData._id) {
        setError("Invalid note data.");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("tags", JSON.stringify(tags));
      formData.append("background", background);
      attachments.forEach((file) => {
        formData.append("attachments", file);
      });
      photos.forEach((photo) => {
        formData.append("photos", photo);
      });
      videos.forEach((video) => {
        formData.append("videos", video);
      });

      const response = await axiosInstance.put(
        `/edit-note/${noteData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
        toast.success("Note updated successfully");
      }
    } catch (error) {
      console.error("Error updating note:", error);
      setError("An error occurred while updating the note.");
      toast.error("Failed to update a note");
    }
  };
      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
        toast.success("Note updated successfully");
      }
    } catch (error) {
      console.error("Error updating note:", error);
      setError("An error occurred while updating the note.");
      toast.error("Failed to update a note");
    }
  };

  const handleSaveNote = () => {
    if (!title) {
      setError("Title is required");
      return;
    }
    if (!content) {
      setError("Content is required");
      return;
    }
    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center bg-gray-50 transition-all justify-center absolute -top-3 -right-3 hover:bg-red-100"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>
  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center bg-gray-50 transition-all justify-center absolute -top-3 -right-3 hover:bg-red-100"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="font-medium">Title</label>
        <div className="relative">
          <input
            type="text"
            className="p-2 border rounded-md text-sm w-full pr-12"
            value={title}
            placeholder="Enter note title"
            onChange={handleTitleChange}
          />
          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs">
            {title.length}/{MAX_TITLE_LENGTH}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium">Title</label>
        <div className="relative">
          <input
            type="text"
            className="p-2 border rounded-md text-sm w-full pr-12"
            value={title}
            placeholder="Enter note title"
            onChange={handleTitleChange}
          />
          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs">
            {title.length}/{MAX_TITLE_LENGTH}
          </span>
        </div>
      </div>

      <label className="font-medium">Content</label>
      <div className="flex flex-col gap-2 mt-4">
        <div className="relative">
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["clean"],
              ],
              clipboard: {
                matchVisual: false,
              },
            }}
            placeholder="Enter note content"
            style={{
              height: "100px",
            }}
          />
          <span className="absolute right-2 bottom-2 text-gray-500 text-xs">
            {content.length}/{MAX_CONTENT_LENGTH}
          </span>
          <button
            className="absolute left-2 bottom-2 text-gray-500"
            onClick={toggleListening}
            disabled={!isSpeechSupported}
          >
            {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
          </button>
          {!isSpeechSupported && (
            <p className="text-red-500 text-xs mt-1">
              Speech recognition is not supported in this browser.
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-12">
        <label className="font-medium">Background Color</label>
        <input
          type="color"
          value={background}
          onChange={handleBackgroundChange}
          className="p-1 border rounded-md w-full"
        />
      </div>
      <div className="flex flex-col gap-2 mt-12">
        <label className="font-medium">Background Color</label>
        <input
          type="color"
          value={background}
          onChange={handleBackgroundChange}
          className="p-1 border rounded-md w-full"
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="font-medium md:text-base">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="font-medium md:text-base">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="font-medium md:text-base">Add Attachments</label>
        <AddAttachmentsInput onFileUpload={handleFileUpload} />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="font-medium md:text-base">Add Attachments</label>
        <AddAttachmentsInput onFileUpload={handleFileUpload} />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="font-medium md:text-base">Add Photos</label>
        <AddAttachmentsInput
          onFileUpload={handlePhotoUpload}
          accept="image/*"
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="font-medium md:text-base">Add Videos</label>
        <AddAttachmentsInput
          onFileUpload={handleVideoUpload}
          accept="video/*"
        />
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <button
        className="w-full items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all dark:border-gray-700 mt-4"
        onClick={handleSaveNote}
      >
        {type === "edit" ? "Update Note" : "Add Note"}
      </button>
    </div>
  );
};

export default AddEditNotes;
