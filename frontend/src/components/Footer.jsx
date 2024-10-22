import React, { useState } from "react";
import img from "./Footer/logo.png";
import Modal from "react-modal";
import GoogleTranslate from "./GoogleTranslate";
import { Link } from "react-router-dom";

const StickyFooter = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);


  
  return (
    <div className="bg-gradient-to-b from-white to-gray-300 border-t border-gray-200 pb-6">
      {/* Flex container for company description and grid layout */}
      {/* Feedback Model */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Feedback Modal"
        style={{ overlay: { zIndex: 1000 }}}
         // Ensure modal appears on top of other elements
      >
        <div className="bg-white p-4 rounded-lg ">
          <h2 className="text-2xl font-bold mb-8">Feedback</h2>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <form >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full border-2 p-1 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border-2 p-1 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Feedback
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="mt-1 block w-full border-2 p-1 rounded-md shadow-sm"
                  rows="4"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex items-center text-gray-900 bg-gray-200 hover:bg-red-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-xs transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-xs transition-all"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </Modal>

      {/* Footer content */}
      <div className="flex flex-col md:flex-row">
        {/* First part: Website Description taking one-third of the space */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2 px-4 md:px-10 py-6">
          <div className="flex items-center mt-2">
            <img src={img} alt="logo" className="h-12 mb-3 mt-6" />
            <p className="text-xl md:text-2xl font-medium -ml-3 mt-4">
              cribbie
            </p>
          </div>
          <p className="text-sm mt-2">
            Scribbie is a platform that connects people with the resources they
            need to stay organized and productive. Explore our features and join
            the community.
          </p>
        </div>

        {/* Second part: Grid layout for links taking two-thirds of the space */}
        <div className="grid grid-cols-1 md:grid-cols-2 w-full md:w-2/3 gap-6 px-4 md:px-0 py-6 text-center md:text-center mt-10">
          {/* Explore Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Explore</h3>
            <ul className="space-y-3">
              <Link to={"/about"}>
                <li className="cursor-pointer hover:text-gray-700 hover:underline underline-offset-2">
                  About
                </li>
              </Link>
              <Link to={"/contact-us"}>
                <li className="cursor-pointer hover:text-gray-700 hover:underline underline-offset-2">
                  Contact Us
                </li>
              </Link>
              <Link to="#" onClick={openModal}>
                <li className="cursor-pointer hover:text-gray-700 hover:underline underline-offset-2">
                  Feedback
                </li>
              </Link>
              
              <Link to={"/version"}>
                <li className="cursor-pointer hover:text-gray-700 hover:underline underline-offset-2">
                  App Version
                </li>
              </Link>
            </ul>
          </div>

          {/* Help & Support Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Help & Support</h3>
            <ul className="space-y-3">
              <Link to={"/help"}>
                <li className="cursor-pointer hover:text-gray-700 hover:underline underline-offset-2">
                  Help Center
                </li>
              </Link>
              <Link to={"/query"}>
                <li className="cursor-pointer hover:text-gray-700 hover:underline underline-offset-2">
                  Submit a Query
                </li>
              </Link>
              <Link to={"/contact"}>
                <li className="cursor-pointer hover:text-gray-700 hover:underline underline-offset-2">
                  Contact Support
                </li>
              </Link>
            </ul>
          </div>
        </div>

        {/* Fourth part: Socials */}
        <div className="flex flex-col items-center md:items-center w-full md:w-1/3 px-4 md:px-0 py-6 mt-10">
          <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
          <div className="flex space-x-3 text-2xl">
            <a href="#">
              <i className="fa-brands fa-instagram cursor-pointer hover:text-gray-700"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-x-twitter cursor-pointer hover:text-gray-700"></i>
            </a>
            <a href="https://github.com/Scribbie-Notes/notes-app">
              <i className="fa-brands fa-github cursor-pointer hover:text-gray-700"></i>
            </a>
          </div>
          <div className="translate flex ml-4 my-auto">
            <GoogleTranslate />
          </div>
        </div>
      </div>
      <hr className="border-t-2 border-grey w-full" />
      {/* Footer Note */}
      <div className="border-t border-gray-200 pt-3 text-center">
        <p className="text-sm md:text-base font-bold">Made with ❤️ in India</p>
        <p className="text-sm mt-2">
          &copy; {new Date().getFullYear()} Cribbie. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default StickyFooter;
