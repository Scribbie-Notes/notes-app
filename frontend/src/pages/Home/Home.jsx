import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const Home = () => {
    return (
        <Router>
            <Routes>
                <Route path="/dashboard" element={<Home />} />
            </Routes>
        </Router>
    )
}

export default Home