import React, { useState } from 'react';
import ProfileInfo from './Cards/ProfileInfo';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import { toast } from 'react-hot-toast';

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.clear();
        navigate("/login");
        toast.success('Logged out successfully', {
            style: {
                fontSize: '13px',
                maxWidth: '400px',
                boxShadow: 'px 4px 8px rgba(0, 1, 4, 0.1)',
                borderRadius: '8px',
                borderColor: 'rgba(0, 0, 0, 0.8)',
                marginTop: '60px',
                marginRight: '10px',
            }
        });
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

            {userInfo && (
                <SearchBar
                    value={searchQuery}
                    onChange={({ target }) => setSearchQuery(target.value)}
                    handleSearch={handleSearch}
                    onClearSearch={onClearSearch}
                />
            )}

            {userInfo ? (
                <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
            ) : (
                <button onClick={() => navigate('/login')} className='text-sm text-slate-700 underline'>
                    Login
                </button>
            )}
        </div>
    );
};

export default Navbar;
