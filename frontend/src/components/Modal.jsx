// components/Modal.js
import React from "react";

const Modal = ({ isOpen, onClose, event, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white p-4 rounded shadow-lg w-[300px]">
        <h2 className="text-xl font-bold" style={{ color: event.color }}>
          {event.title}
        </h2>
        <p className="text-gray-600">Date: {event.date}</p>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="bg-gray-300 p-2 rounded mr-2">
            Close
          </button>
          <button onClick={() => onDelete(event._id)} className="bg-red-500 text-white p-2 rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
