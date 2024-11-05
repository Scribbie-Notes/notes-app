// components/Modal.js
import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose, event, onDelete }) => {
  if (!isOpen || !event) return null;

  // Close modal on Esc key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-[400px] max-w-sm relative">
        {/* Date in top-right corner */}
        <p className="absolute top-2 right-2 text-sm text-gray-600">
          {event.date}
        </p>

        <h2
          id="modal-title"
          className="text-xl font-bold mb-2"
          style={{ color: event.color }}
        >
          {event.title}
        </h2>
        <p
          id="modal-description"
          className="text-sm text-gray-700 mb-4"
        >
          {event.description || "No description provided."}
        </p>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 p-2 rounded-lg transition-all duration-300"
          >
            Close
          </button>
          <button
            onClick={() => onDelete(event._id)}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
