import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 border-t border-gray-300 dark:border-gray-600">
        <footer>
            <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center p-1">
                    <img src="/logo.png" className="h-16" alt="Logo" />
                    <h2 className="text-3xl font-medium ml-[-18px] text-[#2B2B2B] mt-2 dark:text-white">
                        cribbie
                    </h2>
                </div>
                <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 dark:text-gray-400">
                    Unlocking creativity and productivity through intuitive note-taking and seamless organization.
                </p>

                <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
                    <li>
                        <Link
                            to="/about"
                            className="text-gray-700 transition hover:text-gray-700/75 dark:text-gray-300 dark:hover:text-gray-200"
                        >
                            About
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/contact"
                            className="text-gray-700 transition hover:text-gray-700/75 dark:text-gray-300 dark:hover:text-gray-200"
                        >
                            Contact Us
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/feedback"
                            className="text-gray-700 transition hover:text-gray-700/75 dark:text-gray-300 dark:hover:text-gray-200"
                        >
                            Feedback
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/help"
                            className="text-gray-700 transition hover:text-gray-700/75 dark:text-gray-300 dark:hover:text-gray-200"
                        >
                            Help & Support
                        </Link>
                    </li>

                    <li>
                        <Link
                            rel="noreferrer"
                            target="_blank"
                            to="https://github.com/yashmandi/notes-app"
                            className="text-gray-700 transition hover:text-gray-700/75 dark:text-gray-300 dark:hover:text-gray-200"
                        >
                            GitHub
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/version"
                            className="text-gray-700 transition hover:text-gray-700/75 dark:text-gray-300 dark:hover:text-gray-200"
                        >
                            App Version
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    </div>
);

};

export default Footer;
