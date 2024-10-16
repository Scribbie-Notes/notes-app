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


// currently this component is hide
// import Navbar from './components/Navbar';
// import ProtectedRoute from './utils/ProtectedRoute';
// import ErrorPage from './components/ErrorPage';
// import Footer from './components/Footer';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };
    handleRouteChange();
  }, [location]);

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

  return (
    <div>
      {loading && <Loading />}
      {user && location.pathname === "/" ? (
        <Navigate to="/dashboard" replace />
      ) : (
        <Routes>
          <Route path="/landing" exact element={<Hero />} />
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/" exact element={<Hero />} />

          <Route path="/login" exact element={<Login setUser={setUser} />} />
          <Route path="/testimonial" exact element={<Testimonial />} />
          <Route path="/pricing" exact element={<Pricing />} />
          <Route path="/contact-us" exact element={<Contact/>}/>
          <Route path='/footer' exact element ={<Footer />}/>
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/my-profile" exact element={<ProfilePage />} />
          <Route path="/archived-notes" exact element={<ArchivedNotes />} />
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
