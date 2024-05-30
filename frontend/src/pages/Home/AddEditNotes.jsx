import React, { useState, useEffect } from 'react';
import TagInput from '../../components/Input/TagInput';
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';

const AddEditNotes = ({ noteData, type, getAllNotes, onClose }) => {
    const [title, setTitle] = useState(noteData?.title || '');
    const [content, setContent] = useState(noteData?.content || '');
    const [tags, setTags] = useState(noteData?.tags || []);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (noteData) {
            setTitle(noteData.title);
            setContent(noteData.content);
            setTags(noteData.tags);
        }
    }, [noteData]);

    const addNewNote = async () => {
        try {
            const response = await axiosInstance.post("/add-note", {
                title,
                content,
                tags,
                isPinned: false,
            });

            if (response.data && response.data.note) {
                console.log('Added Note:', response.data.note); // Add this line
                getAllNotes();
                onClose();
            }
        } catch (error) {
            console.error("Error adding note:", error);
            setError(error.response?.data?.message || "An unexpected error occurred.");
        }
    };

    const editNote = async () => {
        try {
            const response = await axiosInstance.put(`/edit-note/${noteData._id}`, {
                title,
                content,
                tags,
                isPinned: noteData.isPinned,
            });

            if (response.data && response.data.note) {
                console.log('Edited Note:', response.data.note); // Add this line
                getAllNotes();
                onClose();
            }
        } catch (error) {
            console.error("Error editing note:", error);
            setError(error.response?.data?.message || "An unexpected error occurred.");
        }
    };

    const handleSave = () => {
        if (!title) {
            setError("Title is required");
            return;
        }

        if (!content) {
            setError("Content is required");
            return;
        }

        setError(null);

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

            <button className='btn-primary font-medium mt-5 p-3' onClick={handleSave}>
                {type === 'edit' ? 'UPDATE' : 'ADD'}
            </button>
        </div>
    );
}

export default AddEditNotes;
