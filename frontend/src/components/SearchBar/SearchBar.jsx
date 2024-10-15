import React, { useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';

const SearchBar = ({ value, onChange, onClearSearch }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div 
            className={`w-64 flex items-center px-4 bg-slate-100 rounded-md ${isFocused ? 'shadow-md border-2 border-gray-600' : ''}`} 
            onFocus={() => setIsFocused(true)} 
            onBlur={() => setIsFocused(false)}
        >
            <input
                type="text"
                placeholder='Search Notes'
                className='w-full text-xs bg-transparent py-[11px] outline-none'
                value={value}
                onChange={onChange}
            />

            {value && (
                <IoMdClose 
                    className='text-xl text-slate-500 cursor-pointer hover:text-black mr-3' 
                    onClick={onClearSearch} 
                />
            )}

            <FaMagnifyingGlass className='text-slate-400 cursor-pointer hover:text-black' />
        </div>
    );
};

export default SearchBar;
