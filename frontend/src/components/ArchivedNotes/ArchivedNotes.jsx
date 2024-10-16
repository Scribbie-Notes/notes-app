// import React, { useEffect, useState } from 'react'
// import Navbar from '../Navbar';
// import axiosInstance from '../../utils/axiosInstance';
// import NoteCard from '../Cards/NoteCard';

// const ArchivedNotes = () => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const [isLoading, setIsLoading] = useState(true);
//     const [archivedNotes, setArchivedNotes] = useState([]);


//     const getArchivedNotes = async () => {
//         setIsLoading(true);
//         try {
//           const response = await axiosInstance.get("/get-archived-notes");
//           // console.log(response);
//           if (response.data && response.data.notes) {
//             const notes = response.data.notes.map((note) => ({
//               ...note,
//               tags: Array.isArray(note.tags) ? note.tags : [], // Ensure tags is always an array
//             }));
//             console.log("Fetched Notes:", notes);
//             setArchivedNotes(notes);
//             console.log(archivedNotes)
//           }
//         } catch (error) {
//           console.log("Error while fetching notes");
//         } finally {
//           setIsLoading(false);
//         }
//       };


//       useEffect(() => {
//         getArchivedNotes(); // Fixed: Actually calling the function
//       }, []);
    
//   return (
//     <div>
//          <Navbar userInfo={user} />
//          {
//             archivedNotes.map((note,i)=>(
//                 <h1 key={i}>{note.title}</h1>
//             ))
//          }
//          {/* <div className="container h-auto p-6 pb-12">
//         {isLoading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4 transition-all">
//             {Array.from({ length: 9 }).map((item, i) => {
//               return (
//                 <div
//                   key={i}
//                   className=" animate-pulse group min-h-[170px] bg-gray-200 transition-all duration-300 w-full border rounded-sm"
//                 ></div>
//               );
//             })}
//           </div>
//         ) : archivedNotes.length > 0 ? (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-2 transition-all">
//               {archivedNotes.map((item) => (
//                 <NoteCard
//                   key={item._id}
//                   id={item._id}
//                   title={item.title}
//                   date={item.createdOn}
//                   content={item.content}
//                   tags={item.tags}
//                   isPinned={item.isPinned}
                 
//                   background={item.background}
//                   onEdit={() => handleEdit(item)}
//                   onDelete={() => handleDeleteModalOpen(item._id)}
//                   onPinNote={() => {
//                     updateIsPinned(item);
//                   }}
//                   onClick={() => handleViewNote(item)}
//                   onSelect={handleNoteSelection}
//                   isSelected={selectedNotes.includes(item._id)}
//                 />
//               ))}
//             </div>
//           </>
//         ) : (
//            <div>
//              <p>No archived notes</p>
//            </div>
//         )}
//       </div> */}
//     </div>
//   )
// }

// export default ArchivedNotes

import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import axiosInstance from '../../utils/axiosInstance';
import NoteCard from '../Cards/NoteCard';

const ArchivedNotes = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(true);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState([]);

  const getArchivedNotes = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/get-archived-notes");
      if (response.data && response.data.notes) {
        const notes = response.data.notes.map((note) => ({
          ...note,
          tags: Array.isArray(note.tags) ? note.tags : [],
        }));
        setArchivedNotes(notes);
      }
    } catch (error) {
      console.error("Error while fetching notes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getArchivedNotes(); // Fixed: Actually calling the function
  }, []);

  const handleEdit = (note) => {
    // Implement edit functionality
    console.log("Editing note:", note);
  };

  const handleDeleteModalOpen = (noteId) => {
    // Implement delete functionality
    console.log("Deleting note:", noteId);
  };

  const handleViewNote = (note) => {
    // Implement view functionality
    console.log("Viewing note:", note);
  };

  const updateIsPinned = (note) => {
    // Implement pin functionality
    console.log("Toggling pin for note:", note);
  };

  const handleNoteSelection = (noteId) => {
    setSelectedNotes(prev => {
      if (prev.includes(noteId)) {
        return prev.filter(id => id !== noteId);
      }
      return [...prev, noteId];
    });
  };

  return (
    <div>
      <Navbar userInfo={user} />
      <div className="container h-auto p-6 pb-12 mx-auto">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4 transition-all">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse group min-h-[170px] bg-gray-200 transition-all duration-300 w-full border rounded-sm"
              />
            ))}
          </div>
        ) : archivedNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-2 transition-all">
            {archivedNotes.map((note) => (
              <NoteCard
                key={note._id}
                id={note._id}
                title={note.title}
                date={note.createdOn}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                background={note.background}
                onEdit={() => handleEdit(note)}
                onDelete={() => handleDeleteModalOpen(note._id)}
                onPinNote={() => updateIsPinned(note)}
                onClick={() => handleViewNote(note)}
                onSelect={() => handleNoteSelection(note._id)}
                isSelected={selectedNotes.includes(note._id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500 text-lg">No archived notes found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArchivedNotes;