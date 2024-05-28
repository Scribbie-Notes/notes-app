import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const Home = () => {
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null
    });

    const [allNotes, setAllNotes] = useState([]);
    const [userInfo, setUserInfo] = useState(null);

    const navigate = useNavigate();

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

    const getAllNotes = async () => {
        try {
            const response = await axiosInstance.get("/get-all-notes");
            if (response.data && response.data.notes) {
                setAllNotes(response.data.notes);
            }
        } catch (error) {
            console.log("Error while fetching notes");
        }
    };

    useEffect(() => {
        getAllNotes();
        getUserInfo();
    }, []);

    return (
        <div>
            <Navbar userInfo={userInfo} />

            <div className='container mx-auto'>
                <div className='grid grid-cols-3 gap-4 mt-8'>
                    {allNotes.map(note => (
                        <NoteCard
                            key={note._id}
                            title={note.title}
                            date={note.date}
                            content={note.content}
                            tags={note.tags.join(', ')}
                            isPinned={note.isPinned}
                            onEdit={() => { }}
                            onDelete={() => { }}
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
                />
            </Modal>
        </div>
    );
};

export default Home;
