import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ProfileInfo from "./Cards/ProfileInfo";
import SearchBar from "./SearchBar/SearchBar";
import { toast } from "react-hot-toast";
import gsap from "gsap/all";
import { FiMenu } from "react-icons/fi";
import { SlideTabsExample } from "./Tabs";

const Navbar2 = ({ userInfo, onSearchNote, handleClearSearch }) => {
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
  <div className={`flex items-center shadow justify-between  px-4 py-3  ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      <Link to={userInfo ? "/dashboard" : "/"}>
        <div ref={logoRef} className="flex items-center pl-20 p-2">
          <img src="/logo.png" className="h-12" alt="logo" />
          <h2 className="text-3xl font-medium ml-[-12px] mt-2 tracking-tight">cribbie</h2>
        </div>
      </Link>

      <div className="flex items-center gap-x-5">
        <div className="xl:block hidden"><SlideTabsExample theme={theme} /></div>

        {/* <div className={`hidden md:flex flex-grow justify-center ${userInfo && location.pathname !== "/my-profile" && location.pathname !== "/my-profile" && location.pathname !== "/login"  ? "" : "hidden"}`} ref={searchBarRef}>
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
        </div> */}


        {userInfo ? (
          <div ref={profileRef}><ProfileInfo userInfo={userInfo} onLogout={onLogout} /></div>
        ) : (
          <div className="pr-20">
            {location.pathname !== "/login" && <button ref={loginButtonRef} onClick={() => navigate("/login")} className=" text-white bg-gray-800 hover:bg-gray-700 transition duration-300 ease-in-out font-medium rounded-lg text-md px-4 py-1.5">Login</button>}
            {/* {location.pathname !== "/signup" && <button ref={signupButtonRef} onClick={() => navigate("/signup")} className="text-zinc-200 bg-black rounded-md py-2 px-3">Signup</button>} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar2;