import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import axiosInstance from '../../utils/axiosInstance';
import NoteCard from '../Cards/NoteCard';
import { MdColorLens, MdDelete, MdOutlinePushPin, MdOutlineUnarchive, MdPushPin } from 'react-icons/md';
import toast from 'react-hot-toast';

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
      // Send selected note IDs via the data field, since Axios delete doesn't send req.body directly
      await axiosInstance({
        method: 'delete',
        url: 'http://localhost:5000/delete-multiple-notes',
        data: { noteIds: selectedNotes }, // Pass the noteIds in the data field
      });

      // After successful deletion, refresh the notes and reset selected notes
      getArchivedNotes();
      setSelectedNotes([]);
      toast.success("Deleted Archived Notes successfully");
    } catch (error) {
      console.error("Error deleting notes:", error);
      toast.error("Failed to delete selected notes");
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
                      onDelete={() => handleDeleteModalOpen(item._id)}
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
                  onDelete={() => handleDeleteModalOpen(item._id)}
                  onPinNote={() => {
                    updateIsPinned(item);
                  }}
                  onClick={() => handleViewNote(item)}
                  onSelect={handleNoteSelection}
                  isSelected={selectedNotes.includes(item._id)}
                />
              ))}
            </div>
          </>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? noFound : addPost}
            message={
              isSearch ? (
                <p className="text-xl">Oops! No notes found matching</p>
              ) : (
                <p className="text-xl">
                  Start adding notes by clicking on the "+" button. Lets get
                  started!
                </p>
              )
            }
          />
        )}
      </div>
    </div>
  );
};

export default ArchivedNotes;
