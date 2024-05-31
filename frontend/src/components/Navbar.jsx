import React, { useState } from 'react';
import ProfileInfo from './Cards/ProfileInfo';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const handleSearch = () => {
        if (searchQuery) {
            onSearchNote(searchQuery);
        }
    };

    const onClearSearch = () => {
        setSearchQuery("");
        handleClearSearch();
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

            {userInfo ? (
                <ProfileInfo userInfo={userInfo} onLogout={onLogout} >
                </ProfileInfo>

            ) : (
                <button onClick={() => navigate('/login')} className='text-sm text-slate-700 underline'>
                    Login
                </button>
            )}
        </div>
    );
};

export default Navbar;
