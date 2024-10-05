import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

const navLinks = [
  { link: "/about", name: "About Us" },
  { link: "/contact", name: "Contact Us" },
  { link: "/feedback", name: "Feedback" },
  { link: "/support", name: "Help & Support" },
  {
    link: "https://github.com/yashmandi/notes-app",
    name: "GitHub",
    external: true,
  },
  { link: "/app-version", name: "App Version" },
];

export default function Content() {
  return (
    <div className="bg-[#111827] pt-24 py-8 px-12 h-full w-full flex flex-col justify-between">
      <nav className="grid max-lg:grid-cols-2 mx-auto grid-cols-6 gap-4 text-gray-400">
        {navLinks.map(({ link, name, external }, index) => (
          <NavLink key={index} link={link} name={name} external={external} />
        ))}
      </nav>
      <Nav />
      <Footer />
    </div>
  );
}

const NavLink = ({ link, name, external }) => (
  <a
    className="hover:text-white duration-300 flex justify-center items-center w-48"
    href={link}
    target={external ? "_blank" : "_self"}
    rel={external ? "noreferrer" : undefined}
  >
    {name}
  </a>
);

const Footer = () => {
  const [isWide, setIsWide] = useState(window.innerWidth > 640);
  const location = useLocation();
  const [showButton, setshowButton] = useState(false);

  //check if the current page is the landing page
  useEffect(() => {
    if (location.pathname === "/") {
      setshowButton(true);
    } else {
      setshowButton(false);
    }
  }, [location.pathname]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleResize = () => setIsWide(window.innerWidth > 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="text-white">
      {!isWide && (
        <div className="flex justify-center mb-4">
          <img
            className="w-20 bg-white p-2 rounded-3xl h-20"
            alt="logo"
            src="/logo.png"
          />
        </div>
      )}
      <div
        className={`flex ${
          isWide ? "justify-between items-end" : "flex-col items-center"
        } text-white`}
      >
        <h1
          className={`${
            isWide ? "text-[14vw]" : "text-[12vw] mt-10"
          } leading-[0.8]`}
        >
          Scribbie {!isWide && <br />}
        </h1>
        <p className={isWide ? "" : "mt-8"}>©2024 by Scribbie</p>
        {showButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-[3.7rem] right-9 px-3 py-2 bg-white text-[#111828] rounded-lg border border-transparent hover:text-white hover:bg-[#111828] hover:border-white transition-colors"
          >
            <FaArrowUp size={25} />
          </button>
        )}
      </div>
    </section>
  );
};

const Nav = () => {
  return (
    <div className="flex justify-center sm:gap-20 mt-8">
      <div className="w-full sm:w-2/3">
        <h1 className="text-white mb-8 text-center text-xl sm:text-3xl">
          Unlocking creativity and productivity through intuitive note-taking
          and seamless organization.
        </h1>
      </div>
    </div>
  );
};
