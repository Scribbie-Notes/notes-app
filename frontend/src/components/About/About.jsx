import React, { useState } from "react";
import Modal from "react-modal";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { MdClose } from 'react-icons/md';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

// Tailwind CSS classes for the modal and overlay
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

const About = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="relative">
      <Navbar userInfo={user} />
      <Link to="/dashboard">
        <div className="p-5">
          <button className="inline-flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700">
            <IoMdArrowRoundBack />
          </button>
        </div>
      </Link>
      <div className="flex">
        <div className="container text-gray-800 mx-auto p-6 bg-white">
          <h1 className="text-4xl font-bold mb-8">About Scribbie</h1>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Welcome to Scribbie</h2>
            <p className="text-md mb-6">
              Welcome to <span className="font-semibold">Scribbie</span>!
              Scribbie is your ultimate digital notebook, designed to help you
              capture, organize, and manage your notes effortlessly. Whether
              you're a student, professional, or someone who loves jotting down
              ideas, Scribbie is here to make note-taking simple and enjoyable.
              Our platform offers a seamless experience that allows you to focus
              on your creativity and productivity without worrying about losing
              your thoughts.
            </p>
            <p className="text-md mb-6">
              With Scribbie, you can create notes on the go, organize them with
              tags, and easily search through your content. Our goal is to
              provide a tool that not only helps you capture ideas but also
              helps you turn them into actionable plans. We believe that
              everyone has the potential to be creative and productive, and
              Scribbie is here to unlock that potential.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Features</h2>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">
                Create and edit notes with ease using our intuitive editor.
              </li>
              <li className="mb-2">
                Organize notes with tags to keep related content together.
              </li>
              <li className="mb-2">
                Pin important notes to keep them at the top of your list for
                quick access.
              </li>
              <li className="mb-2">
                Search through your notes quickly and efficiently using our
                powerful search tool.
              </li>
              <li className="mb-2">
                Collaborate with others by sharing your notes and working
                together in real-time.
              </li>
              <li className="mb-2">
                Access your notes from any device, ensuring you always have your
                information at hand.
              </li>
              <li className="mb-2">
                Backup your notes to the cloud for added security and peace of
                mind.
              </li>
              <li className="mb-2">
                Customize your note-taking experience with various themes and
                layouts.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-md mb-6">
              At Scribbie, our mission is to provide a simple and intuitive
              platform for managing your notes. We believe that taking notes
              should be a seamless experience, allowing you to focus on what
              matters most—your thoughts and ideas. Our aim is to create a tool
              that integrates effortlessly into your workflow, enhancing your
              productivity and creativity. We are committed to continuous
              improvement and innovation, ensuring that Scribbie evolves with
              your needs.
            </p>
            <p className="text-md mb-6">
              We understand that every user is unique, and so are their
              note-taking needs. That's why we are constantly adding new
              features and improvements based on user feedback. Our vision is to
              become the go-to digital notebook for individuals and teams across
              the globe, empowering them to achieve more with less effort.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
            <p className="text-md mb-6">
              Our dedicated team of developers, designers, and support staff
              work tirelessly to bring you the best note-taking experience. We
              are passionate about productivity and committed to continuous
              improvement. Our team is a diverse group of individuals with a
              shared vision of making note-taking simple and effective for
              everyone.
            </p>
            <p className="text-md mb-6">
              Each member of our team brings unique skills and perspectives to
              the table, ensuring that Scribbie is a well-rounded and innovative
              product. From brainstorming new features to providing top-notch
              customer support, our team is here to ensure that you have the
              best possible experience with Scribbie.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-md mb-6">
              We'd love to hear from you! If you have any questions, feedback,
              or suggestions, feel free to reach out to us at{" "}
              <a
                href="mailto:support@scribbie.com"
                className="text-blue-500 underline"
              >
                support@scribbie.com
              </a>
              . Your input is invaluable to us, and we are always eager to hear
              how we can improve Scribbie to better meet your needs.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Get Started with Scribbie
            </h2>
            <p className="text-md mb-6">
              Ready to take your note-taking to the next level?{" "}
              <a href="/signup" className="text-blue-500 underline">
                Sign up
              </a>{" "}
              now and start using Scribbie today! Whether you're capturing quick
              thoughts, organizing detailed plans, or collaborating with a team,
              Scribbie has the tools you need to succeed.
            </p>
            <p className="text-md mb-6">
              Join thousands of satisfied users who have transformed their
              note-taking experience with Scribbie. Our user-friendly interface
              and powerful features make it easy to get started and stay
              organized.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="text-md mb-6">
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
            <h2 className="text-3xl font-bold mb-4">Security</h2>
            <p className="text-md mb-6">
              Your security is our top priority. We use the latest technologies
              and best practices to ensure that your data is safe and secure.
              For more information about our security measures, please visit our{" "}
              <a href="/security" className="text-blue-500 underline">
                Security
              </a>{" "}
              page.
            </p>
            <p className="text-md mb-6">
              We understand that your notes contain sensitive information, and
              we are committed to protecting your privacy. Our security
              protocols include data encryption, secure servers, and regular
              security audits. With Scribbie, you can be confident that your
              information is in safe hands.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Terms & Privacy</h2>
            <p className="text-md mb-6">
              We value your privacy and are committed to protecting your
              personal information. For more information about our terms and
              privacy policies, please visit our{" "}
              <a href="/terms" className="text-blue-500 underline">
                Terms & Privacy
              </a>{" "}
              page.
            </p>
            <p className="text-md mb-6">
              Our terms of service and privacy policy outline how we collect,
              use, and protect your data. We believe in transparency and are
              dedicated to maintaining your trust. If you have any questions
              about our policies, please do not hesitate to contact us.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Version and Source Code</h2>
            <p className="text-md mb-2">
              <p>Current Version: v0.1.0 (29 June 2024)</p>
            </p>
            <p className="text-md mb-6">
              The Source Code is available on <span className="text-blue-500 underline"><a href="https://github.com/yashmandi/notes-app" target="_blank" rel="noopener noreferrer">GitHub</a></span> feel free to explore, contribute and find issues.
              Here
            </p>
          </section>
        </div>
        <button
          className="fixed top-1/2 right-1 transform -translate-y-1/2 bg-gray-800 text-white py-3 px-2 p-4 rounded-lg flex flex-col items-center"
          onClick={openModal}
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          <span className="transform rotate-90">{/* Empty span to rotate */}</span>
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
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-2 p-1 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full border-2 p-1 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Feedback</label>
                <textarea
                  className="mt-1 block w-full border-2 p-1 rounded-md shadow-sm"
                  rows="4"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={closeModal}
                  className="inline-flex items-center text-gray-900 bg-gray-200 hover:bg-red-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-xs dark:bg-gray-300  border-gray-800 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-xs dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 transition-all"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
      <Footer />
    </div>
  );
};

export default About;