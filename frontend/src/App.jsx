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
import VerifyEmail from "./pages/ForgotPassword/VerifyEmail";
import VerifyOtp from "./pages/ForgotPassword/VerifyOtp";
import NewPassword from "./pages/ForgotPassword/NewPassword";
import Calendar from "./components/Calendar/Calendar";
import { ScrollToTop } from "react-simple-scroll-up";

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
      {/* <Preloader /> */}
      {loading && <Loading />}
      {user && location.pathname === "/" ? (
        <Navigate to="/dashboard" replace />
      ) : (
        <>
          <Routes>
            <Route path="/landing" exact element={<Hero />} />
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/" exact element={<Hero />} />
            <Route path="/verify-email" exact element={<VerifyEmail />} />
            <Route path="/verify-otp/:id" exact element={<VerifyOtp />} />
            <Route path="/reset-password/:id" exact element={<NewPassword />} />
            <Route path="/login" exact element={<Login setUser={setUser} />} />
            <Route path="/testimonial" exact element={<Testimonial />} />
            <Route path="/pricing" exact element={<Pricing />} />
            <Route path="/contact-us" exact element={<Contact />} />
            <Route path="/contributors" exact element={<Contributors />} />

            <Route path="/signup" exact element={<Signup />} />
            <Route path="/about" exact element={<About />} />
            <Route path="/my-profile" exact element={<ProfilePage />} />
            <Route path="/archived-notes" exact element={<ArchivedNotes />} />
            <Route path="/calendar" exact element={<Calendar />} />
            {/* <Route path="/404" exact element={<ErrorPage/>} /> */}
          </Routes>
          <ScrollToTop
            className="scroll-to-top mr-2 mb-2"
            symbol={
              <span style={{ fontSize: "1.5rem", color: "#fff" }}>
                {" "}
                <i className="fa-solid fa-arrow-up"></i>
              </span>
            }
            size={40}
            bgColor="#111827"
            strokeWidth={3}
            strokeFillColor="#6B7280"
            strokeEmptyColor="#CBCBCB"
            symbolColor="#fff"
          />
        </>
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
