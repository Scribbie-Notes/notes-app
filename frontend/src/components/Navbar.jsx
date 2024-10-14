import { useState, useEffect, useRef, createContext, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import gsap from 'gsap/all';
import { toast } from "react-hot-toast";
import { FiMoon, FiSun } from "react-icons/fi";
import { SlideTabsExample } from "./Tabs";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const logoRef = useRef(null);
  const searchBarRef = useRef(null);
  const profileRef = useRef(null);
  const loginButtonRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(logoRef.current, {
      y: -20,
      opacity: 0,
      scale: 0.8,
    }, {
      duration: 1,
      y: 0,
      opacity: 1,
      scale: 1,
      ease: "power3.out",
    });

    gsap.fromTo(searchBarRef.current, {
      x: 50,
      opacity: 0,
    }, {
      duration: 1,
      x: 0,
      opacity: 1,
      ease: "power3.out",
      delay: 0.5,
    });

    gsap.fromTo(profileRef.current, {
      opacity: 0,
      scale: 0.8,
    }, {
      duration: 1,
      opacity: 1,
      scale: 1,
      ease: "power3.out",
      delay: 1,
    });

    if (loginButtonRef.current) {
      gsap.fromTo(loginButtonRef.current, {
        opacity: 0,
        y: 20,
      }, {
        duration: 1,
        opacity: 1,
        y: 0,
        ease: "bounce.out",
        delay: 1.5,
      });
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

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  const hideSearchBarPaths = ["/", "/my-profile", "/about"];

  return (
    <div className={`flex items-center justify-between px-4 py-2 drop-shadow-md ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      <Link to={userInfo ? "/dashboard" : "/"}>
        <div ref={logoRef} className="flex items-center p-1">
          <img src="/logo.png" className="h-10" alt="logo" />
          <h2 className="text-2xl font-medium ml-[-4px] mt-2 tracking-tight">cribbie</h2>
        </div>
      </Link>

      {userInfo && !hideSearchBarPaths.includes(location.pathname) && (
        <div ref={searchBarRef} className="hidden md:flex flex-grow justify-center mr-20">
          <input
            type="text"
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            placeholder="Search..."
            className="border rounded-md px-4 py-2"
          />
          <button onClick={handleSearch} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">Search</button>
          <button onClick={onClearSearch} className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md">Clear</button>
        </div>
      )}
      <SlideTabsExample />
      {userInfo ? (
        <div ref={profileRef}>
          <button onClick={onLogout} className="px-4 py-2 bg-red-500 text-white rounded-md">Logout</button>
        </div>
      ) : (
        location.pathname !== "/login" && (
          <button
            ref={loginButtonRef}
            onClick={() => navigate("/login")}
            className={`pr-3 transition ${theme === "dark" ? "text-white hover:text-gray-300" : "text-gray-700 hover:text-gray-700/75"}`}
          >
            Login
          </button>
        )
      )}

      <ThemeToggle />
    </div>
  );
};

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center gap-2 px-3 py-2 rounded-full transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"
      }`}
    >
      {isDarkMode ? (
        <>
        <FiMoon className="text-lg" />
        <span>Dark Mode</span>
         
        </>
      ) : (
        <>
        <FiSun className="text-lg" />
        <span>Light Mode</span>
        </>
      )}
    </button>
  );
};

export default () => (
  <ThemeProvider>
    <Navbar />
  </ThemeProvider>
);
