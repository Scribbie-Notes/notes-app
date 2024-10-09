import React, { useState, useRef } from 'react';
import { MdAdd } from 'react-icons/md';

const AddAttachmentsInput = ({ onFileUpload }) => {
  const [files, setFiles] = useState([]); // Store multiple files
  const fileInputRef = useRef(null); // Create a ref for the file input

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files); // Get the selected files
    setFiles(selectedFiles); // Update the state with the selected files
  };

  const handleButtonClick = () => {
    if (files.length > 0) {
      console.log('Files selected:', files);
      onFileUpload(files); // Call the function passed from the parent
      setFiles([]); // Clear the input and state
      fileInputRef.current.value = ''; // Clear the file input field
    } else {
      console.log('No files selected');
    }
  };

  return (
    <div className='flex items-center gap-4'>
      <input
        type="file"
        className='p-2 border rounded-md text-sm'
        onChange={handleFileChange}
        ref={fileInputRef}
        multiple // Allow multiple file selection
      />
      <button
        className='w-9 h-9 flex items-center transition-all rounded-xl border text-white bg-gray-800 hover:bg-gray-900'
        onClick={handleButtonClick}
      >
        <MdAdd className='text-xl text-white-700 hover:text-white ml-[8px]' />
      </button>
    </div>
  );
};

export default AddAttachmentsInput;
