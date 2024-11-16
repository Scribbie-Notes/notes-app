import React, { useState, useEffect } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import AddAttachmentsInput from "../../components/Input/AddAttachmentInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import noteActions from "../../hooks/noteActions"; // Import the hook

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
  const [isPinned, setIsPinned] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  const [initialData, setInitialData] = useState(null); // To store the initial data for revert functionality

  const MAX_TITLE_LENGTH = 60;
  const MAX_CONTENT_LENGTH = 2500;

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  const { addNewNote, editNote } = noteActions(getAllNotes, onClose);

  useEffect(() => {
    if (!SpeechRecognition) {
      setIsSpeechSupported(false);
    }
  }, []);

  if (recognition) {
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let isFinal = event.results[event.results.length - 1].isFinal;
      let transcript = event.results[event.results.length - 1][0].transcript;

      if (isFinal) {
        setContent((prevContent) =>
          (prevContent.trim() + " " + transcript).trim()
        );
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      let errorMessage = "Speech recognition failed";

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
    if (noteData) {
      // Set initial data state for revert functionality
      setInitialData({ ...noteData });

      // Set form data
      setTitle(noteData.title);
      setContent(noteData.content);
      setTags(noteData.tags);
      setAttachments(noteData.files || []);
      setBackground(noteData.background || "#ffffff");
      setPhotos(noteData.photos || []);
      setVideos(noteData.videos || []);
      setIsPinned(noteData.isPinned || false);
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

  const handleContentChange = (value) => {
    if (value.length <= MAX_CONTENT_LENGTH) {
      setContent(value);
    }
  };

  // Custom toolbar configuration
  const customModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["code-block", "link"], // Markdown-like options (code-block, link)
      [{ 'align': [] }],
      ["clean"],
      [{ 'indent': '-1' }, { 'indent': '+1' }], // Indentation options (useful for blockquotes)
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const handleBackgroundChange = (e) => {
    setBackground(e.target.value);
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

    if (type === "edit") {
      editNote({ _id: noteData._id, title, content, tags, attachments, photos, videos, background, isPinned });
    } else {
      addNewNote({ title, content, tags, attachments, photos, videos, background, isPinned });
    }
  };

  const handleRevertChanges = () => {
    if (!initialData) return;

    // Revert all form fields to initial data values
    setTitle(initialData.title);
    setContent(initialData.content);
    setTags(initialData.tags);
    setAttachments(initialData.files || []);
    setBackground(initialData.background || "#ffffff");
    setPhotos(initialData.photos || []);
    setVideos(initialData.videos || []);
    setIsPinned(initialData.isPinned || false);
  };

  return (
    <div className="relative h-[500px] pl-4 pr-4 pt-4 overflow-auto">
      {/* <button
        className="w-10 h-10 rounded-full flex items-center bg-gray-50 transition-all justify-center absolute -top-0 -right-0 hover:bg-red-100"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button> */}

      <div className="flex flex-col gap-1">
        <label className="font-medium">Title</label>
        <div className="relative mr-2">
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

      <div className='mt-3'>
        <label className="font-medium">Content</label>
        <div className="flex flex-col gap-2 mt-1 mr-2">
          <div className="relative">
            <ReactQuill
              value={content}
              onChange={handleContentChange}
              modules={customModules}
              placeholder="Enter note content"
              style={{
                height: "100px",
              }}
            />
            <span className="absolute right-2 bottom-2 text-gray-500 text-xs">
              {content.length}/{MAX_CONTENT_LENGTH}
            </span>
            {/* <button
            className="absolute right-2 top-2 text-gray-500"
            onClick={toggleListening}
            disabled={!isSpeechSupported}
          >
            {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
          </button> */}
            {!isSpeechSupported && (
              <p className="text-red-500 text-xs mt-1">
                Speech recognition is not supported in this browser.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-14">
        <label className="font-medium">Background Color</label>
        <input
          type="color"
          value={background}
          onChange={handleBackgroundChange}
          className="w-9 h-9 cursor-pointer"
        />
      </div>

      <div className="flex flex-col gap-1 mt-4">
        <label className="font-medium md:text-base">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      <div className="flex flex-col gap-1 mt-4">
        <label className="font-medium md:text-base">Add Attachments</label>
        <AddAttachmentsInput onFileUpload={handleFileUpload} />
      </div>

      <div className="flex flex-col gap-1 mt-4">
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

      <div className="flex justify-end">
        <button className="w-auto items-center text-black bg-red-100 hover:bg-gray-900 hover:text-white  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  transition-all dark:border-gray-700 mt-4" onClick={onClose}>
          Close
        </button>
        <button
          className="w-auto items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all dark:border-gray-700 mt-4"
          onClick={handleSaveNote}
        >
        {type === "edit" ? "Update Note" : "Add Note"}
        </button>
      </div>

      {/* Revert Button */}
      {initialData && (
        <button
          className="w-auto items-center text-white bg-red-500 hover:bg-red-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mt-2"
          onClick={handleRevertChanges}
        >
          Revert Changes
        </button>
      )}
    </div>
  );
};

export default AddEditNotes;
