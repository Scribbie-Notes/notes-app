import React, { useState } from 'react';
import ProfileInfo from './Cards/ProfileInfo';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

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

    const hideSearchBarPaths = ['/', '/my-profile', '/about'];

    return (
        <div className='bg-white  dark:bg-gray-800 flex items-center justify-between px-4 py-2 drop-shadow-md'>
        <Link to={userInfo ? '/dashboard' : '/'}>
            <div className='flex items-center p-1'>
                <img src="/logo.png" className='h-10' alt="Logo" />
                <h2 className='text-2xl font-medium ml-[-12px] dark:ml-0 text-[#2B2B2B] mt-2 dark:text-white'>cribbie</h2>
            </div>
        </Link>
    
        {userInfo && !hideSearchBarPaths.includes(location.pathname) && (
            <div className='hidden md:flex flex-grow justify-center mr-20'>
                <SearchBar
                    value={searchQuery}
                    onChange={({ target }) => setSearchQuery(target.value)}
                    handleSearch={handleSearch}
                    onClearSearch={onClearSearch}
                />
            </div>
        )}
    
        {userInfo ? (
            <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        ) : (
            location.pathname !== '/login' && (
                <button onClick={() => navigate('/login')} className='text-gray-700 pr-3 transition hover:text-gray-700/75 dark:text-gray-300 dark:hover:text-gray-200'>
                    Login
                </button>
            )
        )}
    </div>
    
    );
};

export default Navbar;