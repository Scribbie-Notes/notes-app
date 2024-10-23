import { useState, useEffect } from "react";

const FilterTags = ({ allNotes, filterSetNotes }) => {
  const [allTags, setAllTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Extract unique tags from notes
  useEffect(() => {
    const tagsSet = new Set();
    allNotes.forEach((note) => {
      note.tags.forEach((tag) => {
        if (tag !== "") {
          tagsSet.add(tag);
        }
      });
    });

    const uniqueTags = Array.from(tagsSet);
    setAllTags(uniqueTags);
    setFilteredTags(uniqueTags); // Initialize filtered tags with all unique tags
  }, [allNotes]);

  // Handle search input change
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filter tags based on search term
    const filtered = allTags.filter((tag) =>
      tag.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTags(filtered);
  };

  // Handle tag selection/deselection
  const handleTagClick = (tag) => {
    let updatedSelectedTags;

    if (selectedTags.includes(tag)) {
      // If tag is already selected, remove it
      updatedSelectedTags = selectedTags.filter((t) => t !== tag);
    } else {
      // Add new tag to the selected tags
      updatedSelectedTags = [...selectedTags, tag];
    }

    setSelectedTags(updatedSelectedTags);

    // Filter notes based on selected tags
    if (updatedSelectedTags.length > 0) {
      const filteredNotes = allNotes.filter((note) =>
        updatedSelectedTags.every((selectedTag) =>
          note.tags.includes(selectedTag)
        )
      );
      filterSetNotes(filteredNotes);
    } else {
      // If no tags are selected, reset to show all notes
      filterSetNotes(allNotes);
    }
  };

  return (
    <div className="filter-tags-container my-4
    p-4 bg-slate-100 rounded-lg shadow-md flex flex-wrap justify-between mx-auto max-w-4xl">
  {/* Search and Filter Tags Section (Left) */}
  <div className="w-full lg:w-1/2 pr-2">
    {/* Search Input */}
    <input
      type="text"
      placeholder="Search notes via tags..."
      value={searchTerm}
      onChange={handleSearchChange}
      className="search-input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    {/* Filtered Tags List */}
    <div className="filtered-tags flex gap-2 flex-wrap mt-2">
      {filteredTags.slice(0, 5).map((tag, index) => (
        <span
          key={index}
          onClick={() => handleTagClick(tag)}
          className={`tag px-2 py-1 rounded-md cursor-pointer ${
            selectedTags.includes(tag)
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          } transition`}
        >
          #{tag}
        </span>
      ))}
    </div>
  </div>

  {/* Selected Tags Display (Right) */}
  <div className="w-full lg:w-1/2 mt-4 lg:mt-0 lg:pl-2">
    <h4 className="font-semibold mb-2 text-gray-800">Selected Tags:</h4>
    <div className="tags-display flex gap-2 flex-wrap">
      {selectedTags.length > 0 ? (
        selectedTags.map((tag, index) => (
          <span
            key={index}
            onClick={() => handleTagClick(tag)}
            className="tag bg-blue-500 text-white px-2 py-1 rounded-md cursor-pointer hover:bg-blue-600 transition"
          >
            #{tag}
          </span>
        ))
      ) : (
        <span className="text-gray-500">No tags selected</span>
      )}
    </div>
  </div>
</div>

  
  );
};

export default FilterTags;
