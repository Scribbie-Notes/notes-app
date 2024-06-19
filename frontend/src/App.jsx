import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Footer from './components/Footer';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Loading from './components/Loading';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Navbar from './components/Navbar';
import ProtectedRoute from './utils/ProtectedRoute';

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
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing stored user', e);
      }
    }
  }, []);

  return (
    <div>
      {loading && <Loading />}
      {/* <Navbar userInfo={user} /> */}
      <Routes>
        <Route path='/landing' exact element={<Hero />} />
        <Route path='/dashboard' exact element={<Home />} />
        <Route path='/' exact element={<Hero />} />
        <Route path='/login' exact element={<Login setUser={setUser} />} />
        <Route path='/signup' exact element={<Signup />} />
        <Route path='/about' exact element={<About />} />
        {/* <Route path='/my-profile' exact element={<ProtectedRoute><ProfilePage user={user} /></ProtectedRoute>} /> */}
        <Route path='/my-profile' exact element={<ProfilePage />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;