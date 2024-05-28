import React, { useState } from 'react';
import TagInput from '../../components/Input/TagInput';
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';

const AddEditNotes = ({ noteData, type, getAllNotes, onClose }) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);

    const [error, setError] = useState(null);

    // add note
    // Add note function
    // Add note function
    const addNewNote = async () => {
        try {
            const response = await axiosInstance.post("/add-note", {
                title,
                content,
                tags,
                isPinned: false // Provide a default value if needed
            });

            if (response.data && response.data.note) {
                getAllNotes();
                onClose();
            }
        } catch (error) {
            console.error("Error adding note:", error); // Log the full error
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
                if (error.response.data && error.response.data.message) {
                    setError(error.response.data.message);
                } else {
                    setError("An unexpected error occurred.");
                }
            } else if (error.request) {
                console.error("Request data:", error.request);
                setError("No response received from the server.");
            } else {
                console.error("Error message:", error.message);
                setError("An unexpected error occurred.");
            }
        }
    };


    // edit note 
    const editNote = async () => { }

    const handleAddNote = () => {
        if (!title) {
            setError("Title is required");
            return;
        }

        if (!content) {
            setError("Content is required");
            return;
        }

        setError('');

        if (type === 'edit') {
            editNote();
        } else {
            addNewNote();
        }
    }

    return (
        <div className='relative'>

            <button
                className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50'
                onClick={onClose}
            >
                <MdClose className='text-xl text-slate-400' />

            </button>

            <div className='flex flex-col gap-2'>
                <label className='input-label'>TITLE</label>
                <input
                    type="text"
                    className='text-2xl text-slate-950 outline-none'
                    placeholder='Go to Gym at 7am'
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>

            <div className='flex flex-col gap-2 mt-4'>
                <label className='input-label'>CONTENT</label>
                <textarea
                    type="text"
                    className='text-sm text-slate-950 outline-none bg-slate-50 rounded'
                    placeholder='Content'
                    rows={10}
                    value={content}
                    onChange={({ target }) => setContent(target.value)}
                />
            </div>

            <div className='mt-3'>
                <label className='input-label'>TAGS</label>
                <TagInput tags={tags} setTags={setTags} />
            </div>

            {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}

            <button className='btn-primary font-medium mt-5 p-3' onClick={handleAddNote}>
                ADD
            </button>

        </div>
    );
}

export default AddEditNotes;
