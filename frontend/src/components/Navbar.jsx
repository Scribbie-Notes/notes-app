import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ProfileInfo from "./Cards/ProfileInfo";
import SearchBar from "./SearchBar/SearchBar";
import { toast } from "react-hot-toast";
import gsap from "gsap/all";
import { FiMoon, FiSun, FiMenu } from "react-icons/fi";
import { SlideTabsExample } from "./Tabs";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [theme, setTheme] = useState("light");
  const [searchQuery, setSearchQuery] = useState("");
  const [tagQuery, setTagQuery] = useState("");
  const [searchType, setSearchType] = useState("text");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const logoRef = useRef(null);
  const searchBarRef = useRef(null);
  const profileRef = useRef(null);
  const loginButtonRef = useRef(null);
  const signupButtonRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    gsap.fromTo(logoRef.current, { y: -20, opacity: 0, scale: 0.8 }, { duration: 1, y: 0, opacity: 1, scale: 1, ease: "power3.out" });
    gsap.fromTo(searchBarRef.current, { x: 50, opacity: 0 }, { duration: 1, x: 0, opacity: 1, ease: "power3.out", delay: 0.5 });

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
    toast.success("Logged out successfully");
  };

  const onClearSearch = () => {
    setSearchQuery("");
    setTagQuery("");
    handleClearSearch();
  };

  const handleSearch = () => {
    if (searchType === "text" && !searchQuery.trim()) {
      toast.error("Please enter a search term.");
      return;
    }

    if (searchType === "tag" && !tagQuery.trim()) {
      toast.error("Please enter a tag to search.");
      return;
    }

    onSearchNote(searchType === "text" ? searchQuery : tagQuery, searchType);
  };

  return (
    <div className={`flex items-center justify-between px-4 py-2 drop-shadow-md ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      <Link to={userInfo ? "/dashboard" : "/"}><div ref={logoRef} className="flex items-center p-1"><img src="/logo.png" className="h-10" alt="logo" /><h2 className="text-2xl font-medium ml-[-4px] mt-2 tracking-tight">cribbie</h2></div></Link>

      <div className="flex items-center gap-x-5">
        <div className="xl:block hidden"><SlideTabsExample theme={theme} /></div>

        <div className={`hidden md:flex flex-grow justify-center ${userInfo && location.pathname !== "/my-profile" ? "" : "hidden"}`} ref={searchBarRef}>
          <SearchBar
            value={searchType === "text" ? searchQuery : tagQuery}
            tag={searchType === "tag" ? tagQuery : ""}
            searchType={searchType}
            onChange={({ target }) => setSearchQuery(target.value)}
            onTagChange={({ target }) => setTagQuery(target.value)}
            onSearchTypeChange={({ target }) => setSearchType(target.value)}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
        </div>

        <div className="flex gap-x-3 items-center">
          <button onClick={toggleTheme} className={`flex items-center gap-2 p-3 rounded-full transition-colors duration-300 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"}`}>
            {theme === "dark" ? <FiMoon className="text-lg" /> : <FiSun className="text-lg" />}
          </button>

          {userInfo ? (
            <div ref={profileRef}><ProfileInfo userInfo={userInfo} onLogout={onLogout} /></div>
          ) : (
            <>
              {location.pathname !== "/login" && <button ref={loginButtonRef} onClick={() => navigate("/login")} className="pr-3">Login</button>}
              {location.pathname !== "/signup" && <button ref={signupButtonRef} onClick={() => navigate("/signup")} className="text-zinc-200 bg-black rounded-md py-2 px-3">Signup</button>}
            </>
          )}
        </div>

        <button className="block xl:hidden text-xl" onClick={toggleMenu}><FiMenu /></button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-lg z-50 p-4 flex flex-col xl:hidden gap-3">
          <div className="flex flex-col gap-x-10"><SlideTabsExample theme={theme} />
            <div className={`flex md:hidden flex-grow justify-center ${userInfo && location.pathname !== "/my-profile" ? "" : "hidden"}`} ref={searchBarRef}>
              <SearchBar
                value={searchType === "text" ? searchQuery : tagQuery}
                tag={searchType === "tag" ? tagQuery : ""}
                searchType={searchType}
                onChange={({ target }) => setSearchQuery(target.value)}
                onTagChange={({ target }) => setTagQuery(target.value)}
                onSearchTypeChange={({ target }) => setSearchType(target.value)}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
