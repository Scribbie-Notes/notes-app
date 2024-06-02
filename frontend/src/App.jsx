import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Footer from './components/Footer';
import Hero from './components/Hero/Hero';
import About from './components/About/About';

const routes = (
  < Router >
    <Routes>
      <Route path='/landing' exact element={<Hero />} />
      <Route path='/dashboard' exact element={<Home />} />
      <Route path='/' exact element={<Hero />} />
      <Route path='/login' exact element={<Login />} />
      <Route path='/signup' exact element={<Signup />} />
      <Route path='/about' exact element={<About />} />

    </Routes>
  </ Router >

)

const App = () => {
  return <div>
    {routes}
    <Footer />

  </div>
}

export default App