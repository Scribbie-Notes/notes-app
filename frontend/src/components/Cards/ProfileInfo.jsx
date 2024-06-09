import React, { useState, useEffect, useRef } from 'react';
import { getInitials } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';

const ProfileInfo = ({ userInfo, onLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleMyProfile = () => {
        navigate('/my-profile');
        setIsDropdownOpen(false);
    };

    const handleAbout = () => {
        navigate('/about');
        setIsDropdownOpen(false);
    };

    const handleLogout = () => {
        onLogout();
        setIsDropdownOpen(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <div className='relative' ref={dropdownRef}>
            <div className='w-12 h-12 flex items-center justify-center p-3 rounded-full text-slate-950 font-medium bg-slate-100 cursor-pointer' onClick={toggleDropdown}>
                {getInitials(userInfo?.fullName)}
            </div>

            {isDropdownOpen && (
                <div className='absolute right-0 mt-2 w-44  bg-white rounded-md shadow-lg py-2 z-10 border border-1 mt-3'>
                    <button className='block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' onClick={handleMyProfile}>
                        Profile & Settings
                    </button>
                    <button className='block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' onClick={handleAbout}>
                        About
                    </button>
                    <button className='block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileInfo;
