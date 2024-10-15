import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd, MdClose ,MdColorLens, MdOutlinePushPin, MdDelete} from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import AddNotesImg from "../../assets/images/add-notes.svg";
import NoDataImg from "../../assets/images/no-data.svg";
import toast from "react-hot-toast";
import noFound from "../../assets/images/noFound.svg";
import addPost from "../../assets/images/addPost.svg";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [background, setBackground] = useState("#ffffff");
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
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/get-all-notes");
      console.log(response)
      if (response.data && response.data.notes) {
        const notes = response.data.notes.map((note) => ({
          ...note,
          tags: Array.isArray(note.tags) ? note.tags : [], // Ensure tags is always an array
        }));
        // console.log("Fetched Notes:", notes);
        setAllNotes(notes);
      }
    } catch (error) {
      console.log("Error while fetching notes");
    } finally {
      setIsLoading(false);
    }
  };

  // delete note
  const deleteNote = async () => {
    try {
      const deletedNotes = []
      const response = await axiosInstance.delete(
        `/delete-note/${noteToDelete}`
      );
      if (response.status === 200) {
        deletedNotes.push(noteToDelete); // Add noteToDelete to the deletedNotes array
      }
      if (response.data && !response.data.error) {
        getAllNotes();
        
        toast.success(
          <div>
            Notes deleted. <button className='bg-green-500 p-2 text-white rounded' onClick={() => undoDelete(deletedNotes)}>Undo</button>
          </div>,
          { autoClose: 5000 } // Automatically close the toast after 5 seconds
        );
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

  const handleNoteSelection = (noteId) => {
    // console.log(noteId)
    setSelectedNotes(prevSelected => {
      if (prevSelected.includes(noteId)) {
        return prevSelected.filter(id => id !== noteId);
      } else {
        return [...prevSelected, noteId];
      }
    });
  };

  const handleBulkDelete = async () => {
    try {
      const deletedNotes = selectedNotes;
      // Send selected note IDs via the data field, since Axios delete doesn't send req.body directly
      await axiosInstance({
        method: 'delete',
        url: '/delete-multiple-notes',
        data: { noteIds: selectedNotes }, // Pass the noteIds in the data field
      });
  
      // After successful deletion, refresh the notes and reset selected notes
      toast.success(
        <div>
          Notes deleted. <button className='bg-green-500 p-2 text-white rounded' onClick={() => undoDelete(deletedNotes)}>Undo</button>
        </div>,
        { autoClose: 5000 } // Automatically close the toast after 5 seconds
      );
      getAllNotes();
      setSelectedNotes([]);
      // toast.success("Deleted Notes successfully");
    } catch (error) {
      console.error("Error deleting notes:", error);
      toast.error("Failed to delete selected notes");
    }
  };
  
  // undo delete
  const undoDelete = async (deletedNotes) => {
    try {
      // Send a request to restore the deleted notes
      await axiosInstance.post('/restore-multiple-notes', {
        noteIds: deletedNotes
      });
  
      // Refresh the notes list
      getAllNotes();
      toast.success("Undo successful. Notes restored.");
    } catch (error) {
      console.error("Error restoring notes:", error);
      toast.error("Failed to undo delete");
    }
  };
  

  const handleBulkColor = async (color) => {
    try {
      // console.log(color);
      // Send an array of selected note IDs and the new background color in one request
      await axiosInstance.put('/update-notes-background', {
        noteIds: selectedNotes,
        background: color,
      });
  
      getAllNotes();
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
  const pinnedNotes = allNotes.filter((note) => note.isPinned === true);
  const otherNotes = allNotes.filter((note) => note.isPinned !== true);
  // console.log('pinnedNotes',pinnedNotes)
  // console.log('otherNotes',otherNotes)
  return (
    <div>
     
      {selectedNotes.length > 0 ? (
        <div className=" bg-white shadow-md z-50 p-4 flex justify-between items-center">
          <span>{selectedNotes.length} notes selected</span>
          <div className="flex items-center gap-x-5">
          <div className="relative  flex ">
              <button 
                onClick={() => setIsColorPickerOpen(!isColorPickerOpen)} 
                
              >
                <MdColorLens className="text-2xl" />
              </button>
              {isColorPickerOpen && (
                <div className="absolute top-5 right-0 mt-2 p-2 bg-white  rounded shadow-lg">
                  <input 
                    type="color" 
                    value={background}
                    onChange={handleColorChange}
                    className="w-8 h-8 border-none"
                  />
                  <button 
                    onClick={()=>handleBulkColor(background)}
                    className="ml-2 px-2 py-1 bg-blue-500 text-white rounded text-sm"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>
            <button onClick={handleBulkDelete}>
              <MdDelete className="text-2xl  text-black" />
            </button>
          </div>
        </div>
      ) : (
        <Navbar
          userInfo={userInfo}
          onSearchNote={onSearchNote}
          handleClearSearch={handleClearSearch}
          setUserInfo={setUserInfo}
        />
      )}

      <div className="container h-auto p-6 pb-12">
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
        ) : allNotes.length > 0 ? (
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

      <button
        className="w-16 h-16 flex justify-center rounded-2xl items-center text-white bg-gray-800 hover:bg-gray-900 transition-all focus:outline-none fixed right-10 bottom-10 z-50"
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
              <p className="text-gray-700 mt-4"><ReactQuill value={viewNoteModal.data.content} readOnly={true} theme="bubble" /></p>
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
