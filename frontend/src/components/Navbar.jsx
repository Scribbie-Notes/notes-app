import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ProfileInfo from "./Cards/ProfileInfo";
import SearchBar from "./SearchBar/SearchBar";
import { toast } from "react-hot-toast";
import gsap from "gsap/all";
import { FiMenu } from "react-icons/fi";
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

  // useEffect(() => {
  //   gsap.fromTo(logoRef.current, { y: -20, opacity: 0, scale: 0.8 }, { duration: 1, y: 0, opacity: 1, scale: 1, ease: "power3.out" });
  //   gsap.fromTo(searchBarRef.current, { x: 50, opacity: 0 }, { duration: 1, x: 0, opacity: 1, ease: "power3.out", delay: 0.5 });

  //   if (loginButtonRef.current) {
  //     gsap.fromTo(loginButtonRef.current, { opacity: 0, y: 20 }, { duration: 1, opacity: 1, y: 0, ease: "bounce.out", delay: 1.7 });
  //   }
  //   if (signupButtonRef.current) {
  //     gsap.fromTo(signupButtonRef.current, { opacity: 0, y: 20 }, { duration: 1, opacity: 1, y: 0, ease: "bounce.out", delay: 1.5 });
  //   }
  // }, []);

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
    <div
      className={`flex items-center shadow justify-between px-4 py-3 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Link to={userInfo ? "/dashboard" : "/"}>
        <div ref={logoRef} className="flex items-center xl:pl-16 p-2">
          <img src="/logo.png" className="h-12" alt="logo" />
          <h2 className="text-3xl font-medium ml-[-12px] mt-2 tracking-tight">
            cribbie
          </h2>
        </div>
      </Link>

      {/* <button>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          tagQuery={tagQuery}
          setTagQuery={setTagQuery}
          searchType={searchType}
          setSearchType={setSearchType}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
      </button> */}

      <div className="flex items-center gap-x-5 flex-grow justify-between">
        {/* Hide on mobile, show on xl and up */}
        <div className="xl:block hidden">
          <SlideTabsExample theme={theme} />
        </div>

        <div className="flex items-center gap-x-2">
          <Link to="/calendar">
            <button className="border border-gray-900 bg-slate-800 mt-1.5 hover:bg-slate-700 text-white transition duration-300 ease-in-out font-medium rounded-lg text-sm px-3 py-1.5">
              Calendar
            </button>
          </Link>

          {userInfo ? (
            <div className="sm:pr-20 sm:pl-10 " ref={profileRef}>
              <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
            </div>
          ) : (
            <div className="pr-20 sm:pr-20 sm:pl-10 ">
              {location.pathname !== "/login" && (
                <button
                  ref={loginButtonRef}
                  onClick={() => navigate("/login")}
                  className="text-white bg-gray-800 border  hover:bg-gray-700 transition duration-300 ease-in-out font-medium rounded-lg text-md px-4 py-1.5"
                >
                  Login
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
