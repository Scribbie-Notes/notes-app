import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Loading from "./components/Loading";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Testimonial from "./components/Testimonial";
import Pricing from "./components/Pricing";
import Footer from "./components/sticky_footer/Footer";
import Contact from "./components/Contact/Contact";
import Contributors from "./components/Contributors/Contributors";
import ArchivedNotes from "./components/ArchivedNotes/ArchivedNotes";





import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import axiosInstance from "./utils/axiosInstance";
// import { localeData } from "moment";

// currently this component is hide
// import Navbar from './components/Navbar';
// import ProtectedRoute from './utils/ProtectedRoute';
// import ErrorPage from './components/ErrorPage';
// import Footer from './components/Footer';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

   
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Apply the theme to the document body
  useEffect(() => {
    document.body.className = theme; // set the class on body
    localStorage.setItem('theme', theme); // store theme in localStorage
  }, [theme]);

  // Toggle theme between 'light' and 'dark'
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };


  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      console.log(response);
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }

    } catch (error) {
      // if (error.response.status === 401) {
      //   localStorage.clear();
      //   navigate("/login");
      // }
    }
  };

  useEffect(() => {
    getUserInfo();

  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };
    handleRouteChange();
  }, [location]);

  const onSearchNote = async (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setIsSearch(false);
      getAllNotes();
      return;
    }
    const filteredNotes = allNotes.filter(note =>
      note.title.toLowerCase().includes(query.toLowerCase())
    );

    try {
      const response = await axiosInstance.get("/search-notes", { params: { query } });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(filteredNotes);
      }
    } catch (error) {
      console.log("Error while searching notes");
    }
  };


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing stored user", e);
      }
    }
  }, []);

  const debounce = (func, delay) => {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  };
const debouncedSearch = debounce(onSearchNote, 300);
  
const handleSearchInputChange = (query) => {
  debouncedSearch(query);
};

const handleClearSearch = () => {
  setIsSearch(false);
  getAllNotes();
};
 
  return (
    <div>
      <Preloader />
      <Navbar userInfo={userInfo}
          onSearchNote={handleSearchInputChange}
          handleClearSearch={handleClearSearch}
          setUserInfo={setUserInfo} toggleTheme={toggleTheme} theme={theme} />
      {loading && <Loading />}
      {user && location.pathname === "/" ? (
        <Navigate to="/dashboard" replace />
      ) : (
        <Routes>
          <Route path="/landing" exact element={<Hero  theme={theme}/>} />
          <Route path="/dashboard" exact element={<Home  theme={theme}/>} />
          <Route path="/" exact element={<Hero theme={theme}/>} />

          <Route path="/login" exact element={<Login setUser={setUser}  theme={theme}/>} />
          <Route path="/testimonial" exact element={<Testimonial theme={theme}/>} />
          <Route path="/pricing" exact element={<Pricing theme={theme}/>}  />
          <Route path="/contact-us" exact element={<Contact theme={theme}/>} />
          <Route path="/footer" exact element={<Footer theme={theme}/>} />
          <Route path="/signup" exact element={<Signup theme={theme}/>} />
          <Route path="/about" exact element={<About theme={theme}/>} />
          <Route path="/my-profile" exact element={<ProfilePage theme={theme}/>} />
          <Route path="/archived-notes" exact element={<ArchivedNotes theme={theme}/>}  />
          {/* <Route path="/404" exact element={<ErrorPage/>} /> */}
        </Routes>
      )}
    </div>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
    
  </Router>
);

export default AppWithRouter;
