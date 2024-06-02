import React from 'react';
import Footer from '../Footer';

const About = () => {
    return (
        <div className="container text-gray-800 mx-auto mt-10 p-6 bg-white">
            <h1 className="text-2xl font-bold mb-6">About Scribbie</h1>
            <p className="text-md mb-6">
                Welcome to <span className="font-semibold">Scribbie</span>! Scribbie is your ultimate digital notebook, designed to help you capture, organize, and manage your notes effortlessly. Whether you're a student, professional, or someone who loves jotting down ideas, Scribbie is here to make note-taking simple and enjoyable.
            </p>
            <h2 className="text-xl font-bold mb-4">Features</h2>
            <ul className="list-disc pl-6 mb-6">
                <li className="mb-2">Create and edit notes with ease.</li>
                <li className="mb-2">Organize notes with tags.</li>
                <li className="mb-2">Pin important notes to keep them at the top.</li>
                <li className="mb-2">Search through your notes quickly and efficiently.</li>
            </ul>
            <h2 className="text-xl font-bold mb-4">Our Mission</h2>
            <p className="text-md mb-6">
                At Scribbie, our mission is to provide a simple and intuitive platform for managing your notes. We believe that taking notes should be a seamless experience, allowing you to focus on what matters most—your thoughts and ideas.
            </p>
            <h2 className="text-xl font-bold mb-4">Meet the Team</h2>
            <p className="text-md mb-6">
                Our dedicated team of developers, designers, and support staff work tirelessly to bring you the best note-taking experience. We are passionate about productivity and committed to continuous improvement.
            </p>

            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <p className="text-md mb-6">
                We'd love to hear from you! If you have any questions, feedback, or suggestions, feel free to reach out to us at <a href="mailto:support@scribbie.com" className="text-blue-500 underline">support@scribbie.com</a>.
            </p>
            <h2 className="text-xl font-bold mb-4">Get Started with Scribbie</h2>
            <p className="text-md mb-6">
                Ready to take your note-taking to the next level? <a href="/signup" className="text-blue-500 underline">Sign up</a> now and start using Scribbie today!
            </p>
        </div>
    );
}
<Footer />

export default About;
