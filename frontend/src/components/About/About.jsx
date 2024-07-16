import React from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const About = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <Navbar userInfo={user} />
      <Link to="/dashboard">
        <div className="p-5">
          <button className="inline-flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700">
            <IoMdArrowRoundBack />
          </button>
        </div>
      </Link>
      <div className="flex">
        <div className="container text-gray-800 mx-auto pl-72 pr-60 p-4 bg-white">
          <h1 className="text-3xl font-bold mb-4">About Scribbie</h1>
          <section className="mb-12">
            <p className="text-md mb-2">
              Scribbie was founded with the vision of creating a digital
              notebook that is both powerful and easy to use. Our goal is to
              help people capture their ideas and organize their thoughts in a
              way that enhances productivity and creativity. With Scribbie, you
              can take your notes to the next level and achieve more.
            </p>
            <p className="text-md mb-6">
              We believe that everyone has great ideas, and those ideas deserve
              to be captured and explored. Scribbie provides the perfect
              platform for turning your thoughts into reality. Whether you're
              brainstorming a new project, planning your day, or capturing
              fleeting ideas, Scribbie is here to support you.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Features</h2>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-1">
                Create and edit notes with ease using our intuitive editor.
              </li>
              <li className="mb-1">
                Organize notes with tags to keep related content together.
              </li>
              <li className="mb-1">
                Pin important notes to keep them at the top of your list for
                quick access.
              </li>
              <li className="mb-1">
                Search through your notes quickly and efficiently using our
                powerful search tool.
              </li>
              <li className="mb-1">
                Access your notes from any device, ensuring you always have your
                information at hand.
              </li>
              <li className="mb-1">
                Backup your notes to the cloud for added security and peace of
                mind.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Version and Source Code</h2>
            <p className="text-md mb-2">
              <p>Current Version: v0.1.0 (29 June 2024)</p>
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
              feel free to explore, contribute and find issues. Here
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Terms & Privacy</h2>
            <p className="text-md mb-6">
              Our terms of service and privacy policy outline how we collect,
              use, and protect your data. We believe in transparency and are
              dedicated to maintaining your trust. If you have any questions
              about our policies, please do not hesitate to contact us.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
