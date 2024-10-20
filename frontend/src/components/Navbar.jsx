import React, { useState, useEffect, useRef } from "react";
import ProfileInfo from "./Cards/ProfileInfo";
import { useNavigate, useLocation, Link } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";
import { toast } from "react-hot-toast";
import gsap from "gsap/all";
import { SlideTabsExample } from "./Tabs";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const logoRef = useRef(null);
  const searchBarRef = useRef(null);
  const profileRef = useRef(null);
  const loginButtonRef = useRef(null);
  const signupButtonRef = useRef(null);

  useEffect(() => {
    // GSAP animations
    gsap.fromTo(logoRef.current, { y: -20, opacity: 0, scale: 0.8 }, { duration: 1, y: 0, opacity: 1, scale: 1, ease: "power3.out" });
    gsap.fromTo(searchBarRef.current, { x: 50, opacity: 0 }, { duration: 1, x: 0, opacity: 1, ease: "power3.out", delay: 0.5 });
    gsap.fromTo(profileRef.current, { opacity: 0, scale: 0.8 }, { duration: 1, opacity: 1, scale: 1, ease: "power3.out", delay: 1 });
    
    // Animating login/signup buttons
    if (loginButtonRef.current) {
      gsap.fromTo(loginButtonRef.current, { opacity: 0, y: 20 }, { duration: 1, opacity: 1, y: 0, ease: "bounce.out", delay: 1.7 });
    }
    if (signupButtonRef.current) {
      gsap.fromTo(signupButtonRef.current, { opacity: 0, y: 20 }, { duration: 1, opacity: 1, y: 0, ease: "bounce.out", delay: 1.5 });
    }
  }, []);

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
    toast.success("Logged out successfully", {
      style: {
        fontSize: "13px",
        maxWidth: "400px",
        boxShadow: "4px 4px 8px rgba(0, 1, 4, 0.1)",
        borderRadius: "8px",
        borderColor: "rgba(0, 0, 0, 0.8)",
        marginRight: "10px",
      },
    });
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  const hideSearchBarPaths = ["/", "/my-profile", "/about"];

  return (
    <div className="fixed bg-neutral-200 top-0 left-0 w-full  z-50">
      <div className=" backdrop-blur-lg rounded-[1.2rem] flex items-center justify-between px-4 py-2 drop-shadow-md mx-4 mt-4">
        {/* Logo */}
        <Link to={userInfo ? "/dashboard" : "/"}>
          <div ref={logoRef} className="flex items-center p-1">
            <img src="/logo.png" className="h-10" alt="logo" />
          <h2 className="text-2xl font-medium ml-[-12px] text-[#2B2B2B] mt-2">
              cribbie
            </h2>
          </div>
        </Link>

     

        {/* Tabs */}
        <SlideTabsExample />

        {/* Search bar (hidden on specific paths) */}
        {userInfo && !hideSearchBarPaths.includes(location.pathname) && (
          <div ref={searchBarRef} className="hidden md:flex flex-grow justify-center mx-6">
            <SearchBar
              value={searchQuery}
              onChange={({ target }) => {
                setSearchQuery(target.value);
                onSearchNote(target.value);
              }}
              onClearSearch={onClearSearch}
            />
          </div>
        )}

        {/* Profile or Signup/Login */}
        {userInfo ? (
          <div ref={profileRef}>
            <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
          </div>
        ) : (
          location.pathname !== "/login" && location.pathname !== "/signup" && (
            <div className="flex justify-evenly items-center space-x-4">
              <button
                ref={signupButtonRef}
                onClick={() => navigate("/signup")}
                className="text-white bg-blue-600 rounded-md px-4 py-2 transition hover:bg-blue-800"
              >
                Signup
              </button>
              <button
                ref={loginButtonRef}
                onClick={() => navigate("/login")}
                className="text-white bg-gray-700 rounded-md px-4 py-2 transition hover:bg-gray-900"
              >
                Login
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Navbar;
