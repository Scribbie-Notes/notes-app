import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Footer from './components/Footer';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Loading from './components/Loading';

const App = () => {
  const [loading, setLoading] = useState(false);
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

  return (
    <div>
      {loading && <Loading />}
      <Routes>
        <Route path='/landing' exact element={<Hero />} />
        <Route path='/dashboard' exact element={<Home />} />
        <Route path='/' exact element={<Hero />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/signup' exact element={<Signup />} />
        <Route path='/about' exact element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
