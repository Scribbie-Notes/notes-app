import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ProfileInfo from "./Cards/ProfileInfo";
import SearchBar from "./SearchBar/SearchBar";
import { toast } from "react-hot-toast";
import gsap from "gsap/all";
import { FiMoon, FiSun, FiMenu } from "react-icons/fi";
import { SlideTabsExample } from "./Tabs"; // Ensure correct import

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  // console.log(userInfo);
  const [theme, setTheme] = useState("light"); // Manage theme state

  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle mobile menu
  const navigate = useNavigate();
  const location = useLocation();

  const logoRef = useRef(null);
  const searchBarRef = useRef(null);
  const profileRef = useRef(null);
  const loginButtonRef = useRef(null);
  const signupButtonRef = useRef(null);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Animate logo
    gsap.fromTo(
      logoRef.current,
      { y: -20, opacity: 0, scale: 0.8 },
      { duration: 1, y: 0, opacity: 1, scale: 1, ease: "power3.out" }
    );

    // Animate search bar
    gsap.fromTo(
      searchBarRef.current,
      { x: 50, opacity: 0 },
      { duration: 1, x: 0, opacity: 1, ease: "power3.out", delay: 0.5 }
    );

    if (loginButtonRef.current) {
      gsap.fromTo(
        loginButtonRef.current,
        { opacity: 0, y: 20 },
        { duration: 1, opacity: 1, y: 0, ease: "bounce.out", delay: 1.7 }
      );
    }

    if (signupButtonRef.current) {
      gsap.fromTo(
        signupButtonRef.current,
        { opacity: 0, y: 20 },
        { duration: 1, opacity: 1, y: 0, ease: "bounce.out", delay: 1.5 }
      );
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

  const hideSearchBarPaths = ["/", "/my-profile"];

  const handleSearch = () => {
    onSearchNote(searchQuery);
  };


  // console.log(location.pathname);
  return (
    <div
      className={`flex items-center justify-between px-4 py-2 drop-shadow-md ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Link to={userInfo ? "/dashboard" : "/"}>
        <div ref={logoRef} className="flex items-center p-1 ">
          <img src="/logo.png" className="h-10" alt="logo" />
          <h2 className="text-2xl font-medium ml-[-4px] mt-2 tracking-tight">
            cribbie
          </h2>
        </div>
      </Link>

      <div className="flex items-center gap-x-10">
        <div className="md:block hidden">
          <SlideTabsExample theme={theme} />
        </div>

        {/* Main navigation for larger screens */}
        <div
          className={`hidden md:flex flex-grow justify-center mr-20 ${
            userInfo && !hideSearchBarPaths.includes(location.pathname)
              ? ""
              : "hidden"
          }`}
          ref={searchBarRef}
        >
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
        </div>

        {/* Toggle theme and profile/login/signup */}
        <div className="hidden md:flex gap-x-5 items-center">
          <button
            onClick={toggleTheme}
            className={`flex items-center gap-2 p-3 rounded-full transition-colors duration-300  ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {theme === "dark" ? (
              <FiMoon className="text-lg" />
            ) : (
              <FiSun className="text-lg" />
            )}
          </button>

          {userInfo ? (
            <div ref={profileRef}>
              <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
            </div>
          ) : (
            <>
              {location.pathname !== "/login" && (
                <button
                  ref={loginButtonRef}
                  onClick={() => navigate("/login")}
                  className={`pr-3 transition ${
                    theme === "dark"
                      ? "text-white hover:text-gray-300"
                      : "text-gray-700 hover:text-gray-700/75"
                  }`}
                >
                  Login
                </button>
              )}
              {location.pathname !== "/signup" && (
                <button
                  ref={signupButtonRef}
                  onClick={() => navigate("/signup")}
                  className="text-zinc-200 bg-black rounded-md py-2 px-3 transition hover:text-black hover:bg-zinc-200"
                >
                  Signup
                </button>
              )}
            </>
          )}
        </div>
        {/* Hamburger icon for small screens */}
        <button
          className="block md:hidden text-xl"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <FiMenu />
        </button>
      </div>

      {/* Dropdown menu for mobile */}
      {isMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-lg z-10 p-4 flex flex-col md:hidden gap-3">
          <div className="flex items-center gap-x-10  justify-center">
            <SlideTabsExample theme={theme} />

            {/* Hamburger icon for small screens */}

            {/* Main navigation for larger screens */}
            <div
              className={`hidden md:flex flex-grow justify-center mr-20 ${
                userInfo && !hideSearchBarPaths.includes(location.pathname)
                  ? ""
                  : "hidden"
              }`}
              ref={searchBarRef}
            >
              <SearchBar
                value={searchQuery}
                onChange={({ target }) => setSearchQuery(target.value)}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}
              />
            </div>

            {/* Toggle theme and profile/login/signup */}
            <div className="hidden md:flex gap-x-5 items-center">
              <button
                onClick={toggleTheme}
                className={`flex items-center gap-2 p-3 rounded-full transition-colors duration-300 ${
                  theme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {theme === "dark" ? (
                  <FiMoon className="text-lg" />
                ) : (
                  <FiSun className="text-lg" />
                )}
              </button>

              {userInfo ? (
                <div ref={profileRef}>
                  <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
                </div>
              ) : (
                <>
                  {location.pathname !== "/login" && (
                    <button
                      ref={loginButtonRef}
                      onClick={() => navigate("/login")}
                      className={`pr-3 transition ${
                        theme === "dark"
                          ? "text-white hover:text-gray-300"
                          : "text-gray-700 hover:text-gray-700/75"
                      }`}
                    >
                      Login
                    </button>
                  )}
                  {location.pathname !== "/signup" && (
                    <button
                      ref={signupButtonRef}
                      onClick={() => navigate("/signup")}
                      className="text-zinc-200 bg-black rounded-md py-2 px-3 transition hover:text-black hover:bg-zinc-200"
                    >
                      Signup
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="mt-4 mb-2 flex justify-center items-center gap-3"
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
            Toggle Theme
          </button>
          {userInfo ? (
            <div className="flex justify-center">
              <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
            </div>
          ) : (
            <>
              {location.pathname !== "/login" && (
                <button onClick={() => navigate("/login")} className="mt-2">
                  Login
                </button>
              )}
              {location.pathname !== "/signup" && (
                <button onClick={() => navigate("/signup")} className="mt-2">
                  Signup
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
