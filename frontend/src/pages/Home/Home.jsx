import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/ToastMessage/Toast';

Modal.setAppElement('#root');

const Home = () => {
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null
    });

    const [showToastMsg, setShowToastMsg] = useState({
        isShown: false,
        type: "add",
        data: null
    });

    const [allNotes, setAllNotes] = useState([]);
    const [userInfo, setUserInfo] = useState(null);

    const navigate = useNavigate();

    const handleEdit = (noteDetails) => {
        setOpenAddEditModal({ isShown: true, type: "edit", data: noteDetails });
    };

    const showToastMessage = (message, type) => {
        setShowToastMsg({
            isShown: true,
            message,
            type
        });
    };

    const handleCloseToast = () => {
        setShowToastMsg({
            isShown: false,
            message: ""
        });
    };

    // get user
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user");
            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
        }
    };

    // get all notes
    const getAllNotes = async () => {
        try {
            const response = await axiosInstance.get("/get-all-notes");
            if (response.data && response.data.notes) {
                const notes = response.data.notes.map(note => ({
                    ...note,
                    tags: Array.isArray(note.tags) ? note.tags : [] // Ensure tags is always an array
                }));
                console.log('Fetched Notes:', notes);
                setAllNotes(notes);
            }
        } catch (error) {
            console.log("Error while fetching notes");
        }
    };

    // delete notes
    const deleteNote = async (data) => {
        const noteId = data._id;

        try {
            const response = await axiosInstance.delete(`/delete-note/${noteId}`);

            if (response.data && !response.data.error) {
                showToastMessage("Note deleted successfully!", "delete");
                console.log('Deleted Note:', response.data.note); // Add this line
                getAllNotes();
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                console.log(error.response.data.message);
            }
        }
    };

    useEffect(() => {
        getAllNotes();
        getUserInfo();
    }, []);

    useEffect(() => {
        console.log('Updated allNotes:', allNotes);
    }, [allNotes]);

    return (
        <div>
            <Navbar userInfo={userInfo} />
            <div className='container mx-auto'>
                <div className='grid grid-cols-3 gap-4 mt-8'>
                    {allNotes.map((item) => (
                        <NoteCard
                            key={item._id}
                            title={item.title}
                            date={item.createdOn}
                            content={item.content}
                            tags={item.tags}
                            isPinned={item.isPinned}
                            onEdit={() => handleEdit(item)}
                            onDelete={() => deleteNote(item)}
                            onPinNote={() => { }}
                        />
                    ))}
                </div>
            </div>

            <button
                className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10'
                onClick={() => {
                    setOpenAddEditModal({ isShown: true, type: "add", data: null });
                }}
            >
                <MdAdd className='text-[32px] text-white' />
            </button>

            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => {
                    setOpenAddEditModal({ isShown: false, type: "add", data: null });
                }}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                    },
                }}
                contentLabel=""
                className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-hidden"
            >
                <AddEditNotes
                    type={openAddEditModal.type}
                    noteData={openAddEditModal.data}
                    onClose={() => {
                        setOpenAddEditModal({ isShown: false, type: "add", data: null });
                    }}
                    getAllNotes={getAllNotes}
                    showToastMessage={showToastMessage}
                />
            </Modal>

            <Toast
                isShown={showToastMsg.isShown}
                message={showToastMsg.message}
                type={showToastMsg.type}
                onClose={handleCloseToast}
            />
        </div>
    );
};

export default Home;
