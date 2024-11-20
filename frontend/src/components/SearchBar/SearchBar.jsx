import React, { useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';

const SearchBar = ({ value, tag, searchType, onChange, onTagChange, onClearSearch, handleSearch, onSearchTypeChange }) => {
    return (
        <div
            className="w-64 flex items-center px-4 h-[37px] ml-20 bg-slate-200 border border-gray-300 rounded-md relative"
        >
            {/* Dropdown to select search type */}
            {/* <select
                value={searchType}
                onChange={onSearchTypeChange}
                className="text-xs bg-transparent outline-none mr-4"
            >
                <option value="text">Title</option>
                <option value="tag">Tag</option>
            </select> */}

            {/* Display appropriate input based on search type */}
            {searchType === 'text' ? (
                <input
                    type="text"
                    placeholder="Search Notes"
                    className="w-full text-xs bg-transparent py-[11px] outline-none"
                    value={value}
                    onChange={onChange}
                />
            ) : (
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full text-xs bg-transparent py-[11px] outline-none"
                    value={tag}
                    onChange={onTagChange}
                />
            )}

            {/* Clear and search icons */}
            {value || tag ? (
                <IoMdClose
                    className="text-xl text-slate-500 cursor-pointer hover:text-black"
                    onClick={onClearSearch}
                />
            ) : null}

            <FaMagnifyingGlass
                className="text-slate-400 text-2xl cursor-pointer hover:text-black"
                onClick={handleSearch}
            />
        </div>
    );
};

export default SearchBar;