import React, { useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
    };

    const handleBlur = () => {
        setIsClicked(false);
    };

    return (
        <div className={`w-auto flex items-center px-4 bg-slate-100 rounded-md ${isClicked ? 'shadow-md border-2 border-gray-600' : ''}`} onClick={handleClick} onBlur={handleBlur}>
            <input
                type="text"
                placeholder='Search Notes'
                className='w-full text-xs bg-transparent py-[11px] outline-none'
                value={value}
                onChange={onChange}
            />

            {value && (
                <IoMdClose className='text-xl text-slate-500 cursor-pointer hover:text-black mr-3' onClick={onClearSearch} />
            )}

            <FaMagnifyingGlass className='text-slate-400 cursor-pointer hover:text-black' onClick={handleSearch} />
        </div>
    );
};

export default SearchBar;
