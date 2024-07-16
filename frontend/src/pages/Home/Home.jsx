import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd, MdClose } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import AddNotesImg from "../../assets/images/add-notes.svg";
import NoDataImg from "../../assets/images/no-data.svg";
import toast from "react-hot-toast";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [viewNoteModal, setViewNoteModal] = useState({
    isShown: false,
    data: null,
  });

  const handleDeleteModalOpen = (noteId) => {
    setNoteToDelete(noteId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setNoteToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: noteDetails });
  };

  const handleViewNote = (noteDetails) => {
    setViewNoteModal({ isShown: true, data: noteDetails });
  };

  // get user info
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

  useEffect(() => {
    getUserInfo();
    return () => {};
  }, []);

  // get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        const notes = response.data.notes.map((note) => ({
          ...note,
          tags: Array.isArray(note.tags) ? note.tags : [], // Ensure tags is always an array
        }));
        console.log("Fetched Notes:", notes);
        setAllNotes(notes);
      }
    } catch (error) {
      console.log("Error while fetching notes");
    }
  };

  // delete note
  const deleteNote = async () => {
    try {
      const response = await axiosInstance.delete(
        `/delete-note/${noteToDelete}`
      );
      if (response.data && !response.data.error) {
        getAllNotes();
        toast.success("Note deleted successfully", {
          style: {
            fontSize: "13px",
            maxWidth: "400px",
            boxShadow: "px 4px 8px rgba(0, 1, 4, 0.1)",
            borderRadius: "8px",
            borderColor: "rgba(0, 0, 0, 0.8)",
            marginRight: "10px",
          },
        });
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note", {
        style: {
          fontSize: "13px",
          maxWidth: "400px",
          boxShadow: "px 4px 8px rgba(0, 1, 4, 0.1)",
          borderRadius: "8px",
          borderColor: "rgba(0, 0, 0, 0.8)",
          marginTop: "60px",
          marginRight: "10px",
        },
      });
    } finally {
      handleDeleteModalClose();
    }
  };

  // search note
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: {
          query,
        },
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("Error while fetching notes");
    }
  };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    const newIsPinnedStatus = !noteData.isPinned;

    try {
      const response = await axiosInstance.put(
        `/update-note-pinned/${noteId}`,
        {
          isPinned: newIsPinnedStatus,
        }
      );

      if (response.data && response.data.note) {
        const message = newIsPinnedStatus ? "Note Pinned" : "Note Unpinned";
        toast.success(message, {
          style: {
            fontSize: "13px",
            maxWidth: "400px",
            boxShadow: "0px 4px 8px rgba(0, 1, 4, 0.1)",
            borderRadius: "8px",
            borderColor: "rgba(0, 0, 0, 0.8)",
            marginRight: "10px",
          },
        });
        getAllNotes();
      }
    } catch (error) {
      console.log("Error while updating note pinned status:", error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  return (
    <div>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
        setUserInfo={setUserInfo}
      />
      <div className="container h-auto p-6 pb-12">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4 transition-all">
            {allNotes.map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDeleteModalOpen(item._id)}
                onPinNote={() => {
                  updateIsPinned(item);
                }}
                onClick={() => handleViewNote(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? NoDataImg : AddNotesImg}
            message={
              isSearch
                ? "Oops! No notes found matching"
                : `Start adding notes by clicking on the "+" button. Lets get started!`
            }
          />
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl items-center text-white bg-gray-800 hover:bg-gray-900 transition-all focus:outline-none fixed right-10 bottom-10 z-50"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white transition-all" />
      </button>

      {openAddEditModal.isShown && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-5 rounded-lg shadow-lg z-10 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-h-3/4 overflow-hidden">
            <AddEditNotes
              type={openAddEditModal.type}
              noteData={openAddEditModal.data}
              onClose={() =>
                setOpenAddEditModal({ isShown: false, type: "add", data: null })
              }
              getAllNotes={getAllNotes}
            />
          </div>
        </div>
      )}

      {viewNoteModal.isShown && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white p-5 rounded-lg shadow-lg z-10 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-h-3/4 overflow-hidden">
            <button
              className="absolute top-3 right-3 text-gray-900 transition-all bg-gray-50 hover:bg-red-100 hover:text-gray-500 focus:outline-none font-medium rounded-full text-sm px-2.5 py-2.5 text-xs"
              onClick={() => setViewNoteModal({ isShown: false, data: null })}
            >
              <MdClose className="text-xl text-slate-400" />
            </button>
            <div className="overflow-auto">
              <h2 className="text-2xl font-semibold">
                {viewNoteModal.data.title}
              </h2>
              <span className="text-xs text-slate-500">
                {moment(viewNoteModal.data.date).format("Do MMM YYYY")}
              </span>
              <p className="text-gray-700 mt-4">{viewNoteModal.data.content}</p>
              <div className="mt-4">
                {viewNoteModal.data.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 mr-2 text-gray-800 text-xs font-medium px-1.5 py-0.5 rounded dark:bg-blue-100 dark:text-gray-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-5 rounded-lg shadow-lg z-10 w-[90%] max-w-md">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this note?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleDeleteModalClose}
                className="inline-flex items-center text-gray-900 bg-gray-200 hover:bg-red-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-xs dark:bg-gray-300  border-gray-800 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={deleteNote}
                className="inline-flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-xs dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;