import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Footer from './components/Footer';
import Hero from './components/Hero/Hero';

const routes = (
  < Router >
    <Routes>
      <Route path='/landing' exact element={<Hero />} />
      <Route path='/dashboard' exact element={<Home />} />
      <Route path='/' exact element={<Signup />} />
      <Route path='/login' exact element={<Login />} />
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