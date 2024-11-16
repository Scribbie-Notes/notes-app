import React, { useState } from "react";
import Modal from "react-modal";
import Footer from "../Footer";
import Navbar from "../Navbar";
import axiosInstance from "../../utils/axiosInstance";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loading from "../Loading";
import { useEffect } from "react";
import axios from "axios";
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    maxWidth: "500px",
    width: "90%",
    padding: "20px",
    borderRadius: "8px",
    inset: "auto",
  },
};

const apiBaseUrl = import.meta.env.VITE_BACKEND_URL;

const About = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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

    try {
      const response = await axios.post(
        `${apiBaseUrl}/submit`,
        feedbackData
      );
      console.log(response);
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
      closeModal();
    } catch (error) {
      console.error("Error submitting feedback:", error);
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
    <>
      <Navbar userInfo={user} />
      <div className="bg-white">

        <Link to="/dashboard">
          <div className="p-5 pl-28">
            <button className="inline-flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700">
              <IoMdArrowRoundBack />
            </button>
          </div>
        </Link>
        <div className="flex flex-col items-start pl-8 pr-52 ">
          <div className="container text-gray-800 mx-auto rounded-lg p-6 bg-white max-w-screen-lg">
            <h1 className="text-3xl font-bold mb-6">
              About Scribbie
            </h1>
            <section className="mb-12">
              <p className="text-md w-full mb-2">
                Scribbie was founded with the vision of creating a digital notebook that is both powerful and easy to use. Our goal is to help people capture their ideas and organize their thoughts in a way that enhances productivity and creativity. With Scribbie, you can take your notes to the next level and achieve more.
              </p>
              <p className="text-md w-full mb-6">
                We believe that everyone has great ideas, and those ideas deserve to be captured and explored. Scribbie provides the perfect platform for turning your thoughts into reality. Whether you're brainstorming a new project, planning your day, or capturing fleeting ideas, Scribbie is here to support you.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Features
              </h2>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-1">
                  Create and edit notes with ease using our intuitive editor.
                </li>
                <li className="mb-1">
                  Organize notes with tags to keep related content together.
                </li>
                <li className="mb-1">
                  Pin important notes to keep them at the top of your list for quick access.
                </li>
                <li className="mb-1">
                  Search through your notes quickly and efficiently using our powerful search tool.
                </li>
                <li className="mb-1">
                  Access your notes from any device, ensuring you always have your information at hand.
                </li>
                <li className="mb-1">
                  Backup your notes to the cloud for added security and peace of mind.
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Version and Source Code
              </h2>
              <p className="text-md mb-2">
                <span className="font-semibold">
                  Current Version: v0.1.0 (29 June 2024)
                </span>
              </p>
              <p className="text-md mb-6">
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
                feel free to explore, contribute and find issues.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Terms & Privacy
              </h2>
              <p className="text-md mb-6">
                Our terms of service and privacy policy outline how we collect, use, and protect your data. We believe in transparency and are dedicated to maintaining your trust. If you have any questions about our policies, please do not hesitate to contact us.
              </p>
            </section>
          </div>

          <button
            className="fixed top-1/2 right-1 transform -translate-y-1/2 bg-gray-800 text-white py-3 px-2 p-4 rounded-lg"
            onClick={openModal}
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            Feedback
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Feedback Modal"
            style={customStyles}
          >
            <div className="bg-white p-4 rounded-lg">
              <h2 className="text-2xl font-bold mb-8">Feedback</h2>
              {loading ? (
                <Loading />
              ) : (
                <form onSubmit={handleSubmit}>
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
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Rating
                    </label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          onClick={() => setRating(star)}
                          xmlns="http://www.w3.org/2000/svg"
                          fill={rating >= star ? "yellow" : "none"}
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
                      onClick={closeModal}
                      className="inline-flex items-center text-gray-900 bg-gray-200 hover:bg-red-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-300 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 transition-all"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Modal>
        </div>

      </div>

      <Footer />
    </>
  );
};

export default About;
