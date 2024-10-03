import React, { useState, useEffect, useRef } from "react";
import { getInitials } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";

const ProfileInfo = ({ userInfo, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMyProfile = () => {
    navigate("/my-profile");
    setIsDropdownOpen(false);
  };

  const handleAbout = () => {
    navigate("/about");
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
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="w-12 h-12 flex items-center hover:bg-slate-200 justify-center p-3 rounded-full text-slate-950 font-medium bg-slate-100 cursor-pointer transition-all"
        onClick={toggleDropdown}
      >
        {getInitials(userInfo?.fullName)}
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0  w-48  bg-white rounded-md shadow-lg py-2 z-10 border border-1 mt-3">
        <button className="flex items-center gap-2 w-full text-start px-4 py-2 text-gray-700 hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--iconoir"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2"></path>
              <path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6"></path>
            </g>
          </svg>
          <span className="scale-125"></span>
          Profile
        </button>
        <button className="flex gap-2 items-center w-full text-start px-4 py-2  text-gray-700 hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--ph"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M216 36H40a20 20 0 0 0-20 20v144a20 20 0 0 0 20 20h176a20 20 0 0 0 20-20V56a20 20 0 0 0-20-20m-4 24v32H44V60ZM44 116h48v80H44Zm72 80v-80h96v80Z"
            ></path>
          </svg>
          <span className="scale-125"></span>
          About Us
        </button>
        <button className="flex gap-2 items-center w-full text-start px-4 py-2  text-gray-700 hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--carbon"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 32 32"
          >
            <path
              fill="currentColor"
              d="M6 30h12a2 2 0 0 0 2-2v-3h-2v3H6V4h12v3h2V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v24a2 2 0 0 0 2 2"
            ></path>
            <path
              fill="currentColor"
              d="M20.586 20.586L24.172 17H10v-2h14.172l-3.586-3.586L22 10l6 6l-6 6z"
            ></path>
          </svg>
          <span className="scale-125"></span>
          Logout
        </button>
      </div>
      )}
    </div>
  );
};

export default ProfileInfo;
