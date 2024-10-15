import React from 'react'
import Navbar from '../Navbar';

const Contact = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
       <Navbar userInfo={user}/>
        <h1>Contact</h1>
    </div>
  )
}

export default Contact