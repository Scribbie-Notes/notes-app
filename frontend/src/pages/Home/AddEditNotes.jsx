import React, { useState, useEffect } from 'react';
import TagInput from '../../components/Input/TagInput';
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';

const AddEditNotes = ({ noteData, type, getAllNotes, onClose }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (type === 'edit' && noteData) {
            setTitle(noteData.title);
            setContent(noteData.content);
            setTags(noteData.tags);
        }
    }, [type, noteData]);

    const addNewNote = async () => {
        try {
            const response = await axiosInstance.post("/add-note", {
                title,
                content,
                tags,
                isPinned: false
            });

            if (response.data && response.data.note) {
                getAllNotes();
                onClose();
            }
        } catch (error) {
            console.error("Error adding note:", error);
            setError("An error occurred while adding the note.");
        }
    };

    const editNote = async () => {
        try {
            if (!noteData || !noteData._id) {
                setError("Invalid note data.");
                return;
            }

            console.log(`Updating note with ID: ${noteData._id}`);

            const response = await axiosInstance.put(`/edit-note/${noteData._id}`, {
                title,
                content,
                tags
            });

            if (response.data && response.data.note) {
                getAllNotes();
                onClose();
            }
        } catch (error) {
            console.error("Error updating note:", error);
            setError("An error occurred while updating the note.");
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

        setError('');

        if (type === 'edit') {
            editNote();
        } else {
            addNewNote();
        }
    };

    return (
        <div className='relative'>
            <button
                className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50'
                onClick={onClose}
            >
                <MdClose className='text-xl text-slate-400' />
            </button>

            <div className='flex flex-col gap-2'>
                <label className='font-medium'>Title</label>
                <input
                    type="text"
                    className='p-2 border rounded-md'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className='flex flex-col gap-2 mt-4'>
                <label className='font-medium'>Content</label>
                <textarea
                    className='p-2 border rounded-md h-40'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
            </div>

            <div className='flex flex-col gap-2 mt-4'>
                <label className='font-medium'>Tags</label>
                <TagInput tags={tags} setTags={setTags} />
            </div>

            {error && <p className='text-red-500 mt-2'>{error}</p>}

            <button
                className='w-full mt-6 p-2 bg-blue-500 text-white rounded-md'
                onClick={handleSaveNote}
            >
                {type === 'edit' ? 'Update Note' : 'Add Note'}
            </button>
        </div>
    );
};

export default AddEditNotes;
