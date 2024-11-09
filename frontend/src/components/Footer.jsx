import React, { useState } from "react";
import img from "./Footer/logo.png";
import Modal from "react-modal";
import GoogleTranslate from "./GoogleTranslate";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const apiBaseUrl = import.meta.env.VITE_BACKEND_URL;

const StickyFooter = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [appVersionModalIsOpen, setAppVersionModalIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const openFeedbackModal = () => setModalIsOpen(true);
  const closeFeedbackModal = () => setModalIsOpen(false);

  const openAppVersionModal = () => setAppVersionModalIsOpen(true);
  const closeAppVersionModal = () => setAppVersionModalIsOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !email || !feedback || !rating) {
      setLoading(false);
      return toast.error("Fill all the fields", {
        style: {
          fontSize: "13px",
          maxWidth: "400px",
          boxShadow: "4px 4px 8px rgba(0, 1, 4, 0.1)",
          borderRadius: "8px",
          borderColor: "rgba(0, 0, 0, 0.8)",
          marginRight: "10px",
        },
      });
    }



    const feedbackData = {
      name,
      email,
      feedback,
      rating,
    };
    // console.log(feedbackData)
    try {
      const response = await axios.post(`${apiBaseUrl}/submit`, feedbackData);
      toast.success("Feedback submitted successfully", {
        style: {
          fontSize: "13px",
          maxWidth: "400px",
          boxShadow: "4px 4px 8px rgba(0, 1, 4, 0.1)",
          borderRadius: "8px",
          borderColor: "rgba(0, 0, 0, 0.8)",
          marginRight: "10px",
        },
      });
      closeFeedbackModal();
    } catch (error) {
      console.error("Error submitting feedback:", error.message);
      toast.error("Error submitting feedback", {
        style: {
          fontSize: "13px",
          maxWidth: "400px",
          boxShadow: "4px 4px 8px rgba(0, 1, 4, 0.1)",
          borderRadius: "8px",
          borderColor: "rgba(0, 0, 0, 0.8)",
          marginRight: "10px",
        },
      });
    } finally {
      setLoading(false);
    }
    setName("");
    setEmail("");
    setFeedback("");
    setRating(0);
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-300 border-t border-gray-200 pb-6">
      {/* Flex container for company description and grid layout */}
      {/* Feedback Model */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeFeedbackModal}
        contentLabel="Feedback Modal"
        style={{ overlay: { zIndex: 1000 } }}
        // Ensure modal appears on top of other elements
      >
        <div className="bg-white p-4 rounded-lg ">
          <h2 className="text-2xl font-bold mb-8">Feedback</h2>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full border-2 p-1 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border-2 p-1 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Feedback</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="mt-1 block w-full border-2 p-1 rounded-md shadow-sm"
                  rows="4"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      onClick={() => setRating(star)} // Update rating on star click
                      xmlns="http://www.w3.org/2000/svg"
                      fill={rating >= star ? "yellow" : "none"} // Fill stars based on rating
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6 cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.062 6.368a1 1 0 00.95.69h6.691c.969 0 1.371 1.24.588 1.81l-5.416 3.93a1 1 0 00-.364 1.118l2.063 6.368c.3.921-.755 1.688-1.539 1.118l-5.417-3.93a1 1 0 00-1.176 0l-5.417 3.93c-.783.57-1.838-.197-1.538-1.118l2.063-6.368a1 1 0 00-.364-1.118L2.316 11.795c-.783-.57-.381-1.81.588-1.81h6.691a1 1 0 00.95-.69l2.062-6.368z"
                      />
                    </svg>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeFeedbackModal}
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

      {/* App Version Modal */}
      <Modal
        isOpen={appVersionModalIsOpen}
        onRequestClose={closeAppVersionModal}
        contentLabel="App Version Modal"
        style={{ overlay: { zIndex: 1000 } }}
      >
        <div className="bg-white p-4 rounded-lg ">
          <h2 className="text-2xl font-bold mb-8">App Version</h2>
            <section className="mb-12 flex flex-col items-center">
                <p className="text-md w-[60%] text-center mb-2">
                    <span className="font-semibold">Current Version: v0.1.0 (29 June 2024)</span>
                </p>
                <p className="text-md w-[60%] mb-6">
                    The Source Code is available on{" "}
                  <span className="text-blue-500 underline">
                    <a
                        href="https://github.com/yashmandi/notes-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>
                    </span>{" "}
                    and you can find the latest release at{" "}
                    <span className="text-blue-500 underline">
                    <a
                        href="https://github.com/Scribbie-Notes/notes-app/releases/tag/Latest"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Latest Release
                    </a>
                </span>. Feel free to explore, contribute, and find issues.
              </p>
            </section>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeAppVersionModal}
              className="inline-flex items-center text-gray-900 bg-gray-200 hover:bg-red-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-xs transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      {/* Footer content */}
      <div className="flex flex-col md:flex-row">
        {/* First part: Website Description taking one-third of the space */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2 px-4 md:px-10 py-6">
          <div className="flex items-center mt-2">
            <img src={img} alt="logo" className="h-12 mb-3 mt-6" />
            <p className="text-xl md:text-2xl font-medium -ml-3 mt-4">cribbie</p>
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
                <li className="cursor-pointer hover:text-gray-700 hover:underline underline-offset-2">About</li>
              </Link>
              <Link to={"/contact-us"}>
                <li className="cursor-pointer hover:text-gray-700 hover:underline underline-offset-2">Contact Us</li>
              </Link>
              <Link to={"/contributors"}>
                <li className="cursor-pointer hover:text-gray-700 hover:underline underline-offset-2">Contributors</li>
              </Link>
              <Link to="#" onClick={openFeedbackModal}>
                <li className="cursor-pointer hover:text-gray-700 hover:underline underline-offset-2">Feedback</li>
              </Link>
              <Link to="#" onClick={openAppVersionModal}>
                <li className="cursor-pointer hover:text-gray-700 hover:underline underline-offset-2">App Version</li>
              </Link>
            </ul>
          </div>

          {/* Help & Support Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Help & Support</h3>
            <ul className="space-y-3">
              <Link to={"/help"}>
                <li className="cursor-pointer hover:text-gray-700 hover:underline underline-offset-2">Help Center</li>
              </Link>
              <Link to={"/query"}>
                <li className="cursor-pointer hover:text-gray-700 hover:underline underline-offset-2">Submit a Query</li>
              </Link>
              <Link to={"/contact"}>
                <li className="cursor-pointer hover:text-gray-700 hover:underline underline-offset-2">Contact Support</li>
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
        <p className="text-sm mt-2">&copy; {new Date().getFullYear()} Cribbie. All rights reserved.</p>
      </div>
      <Toaster />
    </div>
  );
};

export default StickyFooter;
