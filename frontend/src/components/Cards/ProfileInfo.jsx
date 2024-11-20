import React, { useState, useEffect, useRef } from "react";
import { getInitials } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { CiUser, CiCircleInfo, CiLogout } from "react-icons/ci";
import { MdOutlineArchive } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

const ProfileInfo = ({ userInfo, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMyProfile = () => {
    navigate("/my-profile");
    setIsDropdownOpen(false);
  };

const handleArchivedNotes = () => {
    navigate("/archived-notes");
    setIsDropdownOpen(false)
}

  const handleAbout = () => {
    navigate("/about");
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    setIsModalOpen(true); // Open the confirmation modal
  };

  const confirmLogout = () => {
    onLogout();
    setIsModalOpen(false);
    setIsDropdownOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
    <div className="relative z-50" ref={dropdownRef}>
      <div
        className="w-12 h-12  flex items-center hover:bg-slate- hover:border-gray-950 hover:border justify-center p-3 rounded-full text-slate-950 font-medium bg-slate-200 cursor-pointer  border-gray-700 transition-all"
        onClick={toggleDropdown}
      >
        {getInitials(userInfo?.fullName)}
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0  w-48  bg-white rounded-md shadow-lg py-2  border border-1 mt-3" style={{zIndex:100}}>
          <button
            className="flex items-center gap-2 w-full text-start px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={handleMyProfile}
          >
            <span className="scale-125 mr-1">
              <CiUser />
            </span>
            <span className="text-md font-medium">Profile Settings</span>
          </button>
          <button
            className="flex items-center gap-2 w-full text-start px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={handleArchivedNotes}
          >
            <span className="scale-125 mr-1">
              <MdOutlineArchive />
            </span>
            <span className="text-md font-medium">Archived Notes </span>
          </button>
          <button
            className="flex gap-2 items-center w-full text-start px-4 py-2  text-gray-700 hover:bg-gray-100"
            onClick={handleAbout}
          >
            <span className="scale-125 mr-1">
              <CiCircleInfo />
            </span>
            <span className="text-md font-medium">About </span>
          </button>
          <button
            className="flex gap-2 items-center w-full text-start px-4 py-2  text-gray-700 hover:bg-gray-100"
            onClick={handleLogout}
          >
            <span className="scale-125 mr-1">
              <CiLogout />
            </span>
            <span className="text-md font-medium">Logout </span>
          </button>
        </div>
      )}

      {/* Modal for logout confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center isolate h-screen" style={{ zIndex: 99999 }}>
          
          <div className=" bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-medium">Confirm Logout</h2>
            <p className="mt-2">Are you sure you want to log out?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center"
                onClick={confirmLogout}
              >
                <FaRegTrashAlt size={20} />
                <p className="ml-2">Logout</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
