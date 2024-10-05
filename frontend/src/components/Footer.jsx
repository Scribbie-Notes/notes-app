import React from "react";
import img from "./Footer/logo.png";
import { Link } from "react-router-dom";

const StickyFooter = () => {
  return (
    <div className="bg-gray-200 pb-3">
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center">
          <img src={img} alt="logo" className="h-16 md:h-20 mb-3 mt-3" />
          <p className="text-xl md:text-2xl font-medium -ml-4 mt-4">cribbie</p> {/* Negative margin added here */}
        </div>

        {/* Icons */}
        <div className="flex mt-3 md:mt-0 gap-3 text-2xl md:mr-3">
          <a href="#"><i className="fa-brands fa-instagram cursor-pointer hover:text-gray-700"></i></a>
          <a href="#"><i className="fa-brands fa-x-twitter cursor-pointer hover:text-gray-700"></i></a>
          <a href="https://github.com/Scribbie-Notes/notes-app"><i className="fa-brands fa-github cursor-pointer hover:text-gray-700"></i></a>
        </div>
      </div>

      <div>
        {/* Links */}
        <ul className="flex flex-col md:flex-row justify-center gap-3 md:gap-6 text-base md:text-lg font-medium mt-3 text-center">
          <Link to={'/about'}>
            <li className="cursor-pointer hover:text-gray-700 hover:underline underline-offset-2">About</li>
          </Link>
          <Link to={'/contact'}>
            <li className="cursor-pointer hover:text-gray-700 hover:underline underline-offset-2">Contact us</li>
          </Link>
          <Link to={'/feedback'}>
            <li className="cursor-pointer hover:text-gray-700 hover:underline underline-offset-2">Feedback</li>
          </Link>
          <Link to={'/help'}>
            <li className="cursor-pointer hover:text-gray-700 hover:underline underline-offset-2">Help and Support</li>
          </Link>
          <Link to={'/version'}>
            <li className="cursor-pointer hover:text-gray-700 hover:underline underline-offset-2">App Version</li>
          </Link>
        </ul>

        {/* Footer Note */}
        <p className="text-center text-sm md:text-base mt-4 mb-2">Made with ❤️ in India</p>
      </div>
    </div>
  );
};

export default StickyFooter;
