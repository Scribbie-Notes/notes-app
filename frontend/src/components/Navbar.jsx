import React, { useState } from 'react';
import ProfileInfo from './Cards/ProfileInfo';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const handleSearch = () => {
        // Implement search functionality if needed
    };

    const onClearSearch = () => {
        setSearchQuery("");
    };

    return (
        <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow-lg'>
            <h2 className='text-2xl font-medium py-2'>Notes</h2>

            <SearchBar
                value={searchQuery}
                onChange={({ target }) => setSearchQuery(target.value)}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}
            />

            <ProfileInfo onLogout={onLogout} />
        </div>
    );
};

export default Navbar;
