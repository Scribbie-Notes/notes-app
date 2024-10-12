import { useState, useEffect, useRef, createContext, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import gsap from 'gsap/all';
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
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
  const selected = theme;

  return (
    <div className={`grid h-0 place-content-center transition-colors ${selected === "light" ? "bg-white" : "bg-gray-800"}`}>
      <SliderToggle selected={selected} setSelected={toggleTheme} />
    </div>
  );
};

const SliderToggle = ({ selected, setSelected }) => {
  return (
    <div className="relative flex w-fit items-center rounded-full">
      <button
        className={`text-sm font-medium flex items-center gap-2 px-3 py-3 transition-colors relative z-10 ${selected === "light" ? "text-white" : "text-slate-300"}`}
        onClick={() => setSelected("light")}
      >
        <FiMoon className="relative z-10 text-lg" />
        <span className="relative z-10">Light</span>
      </button>
      <button
        className={`text-sm font-medium flex items-center gap-2 px-3 py-3 transition-colors relative z-10 ${selected === "dark" ? "text-white" : "text-slate-800"}`}
        onClick={() => setSelected("dark")}
      >
        <FiSun className="relative z-10 text-lg" />
        <span className="relative z-10">Dark</span>
      </button>
      <div className={`absolute inset-0 z-0 flex ${selected === "dark" ? "justify-end" : "justify-start"}`}>
        <motion.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
        />
      </div>
    </div>
  );
};


export default () => (
  <ThemeProvider>
    <Navbar />
  </ThemeProvider>
);
