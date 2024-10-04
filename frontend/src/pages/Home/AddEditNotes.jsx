import React, { useState, useEffect } from 'react';
import TagInput from '../../components/Input/TagInput';
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import AddAttachmentsInput from '../../components/Input/AddAttachmentsInput';

const AddEditNotes = ({ noteData, type, getAllNotes, onClose }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [attachments, setAttachments] = useState([]); // Store multiple attachments
    const [error, setError] = useState(null);

    useEffect(() => {
        if (type === 'edit' && noteData) {
            setTitle(noteData.title);
            setContent(noteData.content);
            setTags(noteData.tags);
            setAttachments(noteData.files || []); // Ensure files is an array
        }
    }, [type, noteData]);

    const handleFileUpload = (files) => {
        console.log('Uploaded files:', files); // Log the uploaded files
        setAttachments((prevAttachments) => [...prevAttachments, ...files]); // Add multiple files
    };

    const addNewNote = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('tags', tags); 

        attachments.forEach((file) => {
            formData.append('attachments', file); // Append each file to FormData
        });

        try {
            const response = await axiosInstance.post("/add-note", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data && response.data.note) {
                getAllNotes();
                onClose();
                toast.success('Note added successfully', {
                    style: {
                        fontSize: '13px',
                        maxWidth: '400px',
                        boxShadow: 'px 4px 8px rgba(0, 1, 4, 0.1)',
                        borderRadius: '8px',
                        borderColor: 'rgba(0, 0, 0, 0.8)',
                        marginRight: '10px',
                    }
                });
            }
        } catch (error) {
            console.error("Error adding note:", error);
            setError("An error occurred while adding the note.");
            toast.error('Failed to add a note', {
                style: {
                    fontSize: '13px',
                    maxWidth: '400px',
                    boxShadow: 'px 4px 8px rgba(0, 1, 4, 0.1)',
                    borderRadius: '8px',
                    borderColor: 'rgba(0, 0, 0, 0.8)',
                    marginRight: '10px',
                }
            });
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
                toast.success('Note updated successfully', {
                    style: {
                        fontSize: '13px',
                        maxWidth: '400px',
                        boxShadow: 'px 4px 8px rgba(0, 1, 4, 0.1)',
                        borderRadius: '8px',
                        borderColor: 'rgba(0, 0, 0, 0.8)',
                        marginRight: '10px',
                    }
                });
            }
        } catch (error) {
            console.error("Error updating note:", error);
            setError("An error occurred while updating the note.");
            toast.error('Failed to update a note', {
                style: {
                    fontSize: '13px',
                    maxWidth: '400px',
                    boxShadow: 'px 4px 8px rgba(0, 1, 4, 0.1)',
                    borderRadius: '8px',
                    borderColor: 'rgba(0, 0, 0, 0.8)',
                    marginRight: '10px',
                }
            });
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
                className='w-10 h-10 rounded-full flex items-center bg-gray-50 transition-all justify-center absolute -top-3 -right-3 hover:bg-red-100'
                onClick={onClose}
            >
                <MdClose className='text-xl text-slate-400' />
            </button>

            <div className='flex flex-col gap-2'>
                <label className='font-medium'>Title</label>
                <input
                    type="text"
                    className='p-2 border rounded-md text-sm'
                    value={title}
                    placeholder='Enter note title'
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className='flex flex-col gap-2 mt-4'>
                <label className='font-medium'>Content</label>
                <textarea
                    className='p-2 border rounded-md h-40 text-sm'
                    placeholder='Enter note content'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
            </div>

            <div className='flex flex-col gap-2 mt-4'>
                <label className='font-medium md:text-base'>Tags</label>
                <TagInput tags={tags} setTags={setTags} />
            </div>

            <div className='flex flex-col gap-2 mt-4'>
                <label className='font-medium md:text-base'>Attachments</label>
                <AddAttachmentsInput onFileUpload={handleFileUpload} />
            </div>
            {error && <p className='text-red-500 mt-2'>{error}</p>}

            <button
                className='w-full items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all  dark:border-gray-700 mt-4'
                onClick={handleSaveNote}
            >
                {type === 'edit' ? 'Update Note' : 'Add Note'}
            </button>
        </div>
    );
};

export default AddEditNotes;
