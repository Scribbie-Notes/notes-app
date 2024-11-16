import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import axiosInstance from '../../utils/axiosInstance';
import NoteCard from '../Cards/NoteCard';
import { MdColorLens, MdDelete, MdOutlinePushPin, MdOutlineUnarchive, MdPushPin, MdClose} from 'react-icons/md';
import toast from 'react-hot-toast';
import axios from 'axios';
import AddEditNotes from "../../pages/Home/AddEditNotes";
import moment from "moment";
import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom';
import {IoMdArrowRoundBack} from 'react-icons/io';

const ArchivedNotes = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(true);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [refreshNotes, setRefreshNotes] = useState(false);
  const [background, setBackground] = useState("#ffffff");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [viewNoteModal, setViewNoteModal] = useState({
    isShown: false,
    data: null,
  });

  const getArchivedNotes = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/get-archived-notes");
      const notes = response.data.notes?.map(note => ({
        ...note,
        tags: Array.isArray(note.tags) ? note.tags : [],
      })) || [];
      setArchivedNotes(notes);
    } catch (error) {
      console.error("Error fetching archived notes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getArchivedNotes();
  }, [refreshNotes]);

  const handleDeleteModalOpen = (noteId) => {
    setNoteToDelete(noteId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setNoteToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const deleteNote = async (noteId) => {
    try {
      const response = await axiosInstance.delete(`/delete-note/${noteId}`);
      if (response.data && !response.data.error) {
        setRefreshNotes(prev => !prev);
        toast.success("Note deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    } finally {
      handleDeleteModalClose();
    }
  };

  const handleNoteSelection = (noteId) => {
    setSelectedNotes(prev => prev.includes(noteId) ? prev.filter(id => id !== noteId) : [...prev, noteId]);
  };

  const handleBulkUnArchive = async () => {
    try {
      const noteIds = selectedNotes;
      console.log(noteIds)
      const response = await axiosInstance.put("/un-archive-notes", { noteIds: selectedNotes });
      if (response.status === 200) {
        toast.success("Selected notes un-archived successfully");
        setSelectedNotes([]); // Clear selection after successful update
        setRefreshNotes(prev => !prev); // Trigger refresh
      }
    } catch (error) {
      console.error("Error un-archiving notes:", error.message);
      toast.error("Failed to un-archive selected notes");
    }
  };

  const handleBulkColor = async (color) => {
    try {
      await axiosInstance.put('/update-notes-background', { noteIds: selectedNotes, background: color });
      getArchivedNotes();
      setSelectedNotes([]);
      toast.success("Color applied to selected notes");
    } catch (error) {
      console.error("Error applying color:", error);
      toast.error("Failed to apply color to selected notes");
    }
  };

  const handleColorChange = (e) => {
    setBackground(e.target.value);
  };

  const handleBulkDelete = async () => {
    try {
      const deletedNotes = selectedNotes;
      console.log(deletedNotes)
      // Send selected note IDs via the data field, since Axios delete doesn't send req.body directly
      await axiosInstance({
        method: 'delete',
        url: 'http://localhost:5000/delete-multiple-notes',
        data: { noteIds: selectedNotes }, // Pass the noteIds in the data field
      });

      // After successful deletion, refresh the notes and reset selected notes
      getArchivedNotes();
      setSelectedNotes([]);
      toast.success(<div>
        Archived Notes deleted. <button className='bg-green-500 p-2 text-white rounded' onClick={() => undoDelete(deletedNotes)}>Undo</button>
      </div>,
      { autoClose: 5000 } );
    } catch (error) {
      console.error("Error deleting notes:", error);
      toast.error("Failed to delete selected notes");
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
        getArchivedNotes();
      }
    } catch (error) {
      console.log("Error while updating note pinned status:", error);
    }
  };

  const handleBulkPin = async () => {
    const isAllPinnedSelected = selectedNotes.some((selectedNote) =>
      otherNotes.some((note) => note._id === selectedNote && !note.isPinned)
    );

    const updateData = {
      noteIds: selectedNotes,
      isPinned: isAllPinnedSelected // true to pin, false to unpin
    };

    try {
      // Send one API call to pin/unpin the selected notes
      await axiosInstance.put('http://localhost:5000/bulk-update-notes-pinned', updateData);

      // Refresh notes and clear selection
      getArchivedNotes();
      setSelectedNotes([]);
      toast.success(`Selected archived notes ${isAllPinnedSelected ? 'pinned' : 'unpinned'} successfully`);
      setIsColorPickerOpen(false);
    } catch (error) {
      console.error("Error updating notes:", error);
      toast.error(`Failed to ${isAllPinnedSelected ? 'pin' : 'unpin'} selected notes`);
    }
  };

  const pinnedNotes = archivedNotes.filter((note) => note.isPinned === true);
  const otherNotes = archivedNotes.filter((note) => note.isPinned !== true);

  const undoDelete = async (deletedNotes) => {
    try {
      const accessToken = localStorage.getItem("token");
      // Send a request to restore the deleted notes
      const response = await axios.put('http://localhost:5000/undo-delete-notes', {
        noteIds: deletedNotes
      },{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}` // Replace `yourToken` with your actual token variable
        }
      });

      // Refresh the notes list
      getArchivedNotes();
      toast.success("Undo successful. Notes restored.");
    } catch (error) {
      console.error("Error restoring notes:", error.message);
      toast.error("Failed to undo delete");
    }
  }

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: noteDetails });
  };

  const handleViewNote = (noteDetails) => {
    setViewNoteModal({ isShown: true, data: noteDetails });
  };

  return (
    <div>
      {selectedNotes.length > 0 ? (
        <div className="bg-white shadow-md z-50 p-4 flex justify-between items-center">
          <span>{selectedNotes.length} notes selected</span>
          <div className="flex items-center gap-x-5">
            <div className="relative flex">
              <button onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}>
                <MdColorLens className="text-2xl" />
              </button>
              {isColorPickerOpen && (
                <div className="absolute top-5 right-0 mt-2 p-2 bg-white rounded shadow-lg">
                  <input
                    type="color"
                    value={background}
                    onChange={handleColorChange}
                    className="w-8 h-8 border-none"
                  />
                  <button
                    onClick={() => handleBulkColor(background)}
                    className="ml-2 px-2 py-1 bg-blue-500 text-white rounded text-sm"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>
            <button onClick={handleBulkPin} className="mr-2">
              {
                // Check if any selectedNote is found in the otherNotes array and is unpinned
                selectedNotes.some((selectedNote) =>
                  otherNotes.some(
                    (note) => note._id === selectedNote && !note.isPinned
                  )
                ) ? (
                  <MdOutlinePushPin className="text-2xl" /> // Outlined icon for unpinned notes
                ) : (
                  <MdPushPin className="text-2xl" />
                ) // Filled icon for pinned notes
              }
            </button>
            <button onClick={handleBulkUnArchive}>
              <MdOutlineUnarchive className="text-2xl text-black" />
            </button>
            <button onClick={handleBulkDelete}>
              <MdDelete className="text-2xl  text-black" />
            </button>
          </div>
        </div>
      ) : (
        <Navbar userInfo={user} />
      )}
      <Link to="/dashboard">
          <div className="p-5 pl-28">
            <button className="inline-flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700">
              <IoMdArrowRoundBack className="mr-2 ml-[-5px]" />Back
            </button>
          </div>
        </Link>
      <div className="container h-auto p-6 pb-12 mx-auto">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4 transition-all">
            {Array.from({ length: 9 }).map((item, i) => {
              return (
                <div
                  key={i}
                  className=" animate-pulse group min-h-[170px] bg-gray-200 transition-all duration-300 w-full border rounded-sm"
                ></div>
              );
            })}
          </div>
        ) : archivedNotes.length > 0 ? (
            <>
            {pinnedNotes.length > 0 && (
              <div>
                <h1 className="font-bold pl-2">PINNED</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-2 transition-all mb-3">
                  {pinnedNotes.map((item) => (
                    <NoteCard
                      key={item._id}
                      id={item._id}
                      title={item.title}
                      date={item.createdOn}
                      content={item.content}
                      tags={item.tags}
                      isPinned={item.isPinned}

                      background={item.background}
                      onEdit={() => handleEdit(item)}
                      onDelete={() => deleteNote(item._id)}
                      onPinNote={() => {
                        updateIsPinned(item);
                      }}
                      isSelected={selectedNotes.includes(item._id)}
                      onSelect={handleNoteSelection}
                      onClick={() => handleViewNote(item)}
                    />
                  ))}
                </div>
              </div>
            )}
            {
              pinnedNotes.length > 0 && <h1 className="font-bold pl-2">OTHERS</h1>
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-2 transition-all">
              {otherNotes.map((item) => (
                <NoteCard
                  key={item._id}
                  id={item._id}
                  title={item.title}
                  date={item.createdOn}
                  content={item.content}
                  tags={item.tags}
                  isPinned={item.isPinned}

                  background={item.background}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => deleteNote(item._id)}
                  onPinNote={() => {
                    updateIsPinned(item);
                  }}
                  onClick={() => handleViewNote(item)}
                  onSelect={handleNoteSelection}
                  isSelected={selectedNotes.includes(item._id)}
                />
              ))}
            </div>
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
                            getAllNotes={getArchivedNotes}
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
                    <p className="text-gray-700 mt-4"><ReactQuill value={viewNoteModal.data.content} readOnly={true} theme="bubble" /></p>
                    <div className="mt-4">
                        {viewNoteModal.data.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="inline-block bg-gray-100 mr-2 text-gray-800 text-xs font-medium px-1.5 py-0.5 rounded dark:bg-blue-100 dark:text-gray-800"
                        >#{tag}
                        </span>
                        ))}
                    </div>
                    </div>
                </div>
                </div>
            )}
          </>
        ) : (
           <div className="text-center text-2xl mt-24">No Archived Notes</div>
        )}
      </div>
    </div>
  );
};

export default ArchivedNotes;
