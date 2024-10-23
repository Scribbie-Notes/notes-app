import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

// Accept theme as a prop in SlideTabsExample
export const SlideTabsExample = ({ theme }) => {
  return (

    <div className="bg-white  rounded-lg m-2 p-2">
      <SlideTabs />

    <div className={theme === "dark" ? "bg-gray-800" : "bg-white py-2"}>
      <SlideTabs theme={theme} />

    </div>
  );
};

const SlideTabs = ({ theme }) => {
  const location = useLocation();
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [hoveredTab, setHoveredTab] = useState(null);
  const currentPathName = location.pathname;

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
        setHoveredTab(null);
      }}

      className="relative mx-auto b flex w-fit bg-white p-1"
    >
      <Tab
        setPosition={setPosition}
        currentPathName={currentPathName}
        to="/"
        hoveredTab={hoveredTab}
        setHoveredTab={setHoveredTab}
      >
        Home
      </Tab>
      <Tab
        setPosition={setPosition}
        currentPathName={currentPathName}
        to="/dashboard"
        hoveredTab={hoveredTab}
        setHoveredTab={setHoveredTab}
      >
        Dashboard
      </Tab>
      <Tab
        setPosition={setPosition}
        currentPathName={currentPathName}
        to="/about"
        hoveredTab={hoveredTab}
        setHoveredTab={setHoveredTab}
      >

      className={`relative mx-auto flex w-fit p-1 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <Tab theme={theme} setPosition={setPosition} to="/" currentPathName={currentPathName} hoveredTab={hoveredTab} setHoveredTab={setHoveredTab}>
        Home
      </Tab>
      <Tab theme={theme} setPosition={setPosition} to="/about" currentPathName={currentPathName} hoveredTab={hoveredTab} setHoveredTab={setHoveredTab}>

        About
      </Tab>
      <Tab theme={theme} setPosition={setPosition} to="/testimonial" currentPathName={currentPathName} hoveredTab={hoveredTab} setHoveredTab={setHoveredTab}>
        Testimonial
      </Tab>
      <Tab theme={theme} setPosition={setPosition} to="/pricing" currentPathName={currentPathName} hoveredTab={hoveredTab} setHoveredTab={setHoveredTab}>
        Pricing
      </Tab>
      <Tab theme={theme} setPosition={setPosition} to="/contact-us" currentPathName={currentPathName} hoveredTab={hoveredTab} setHoveredTab={setHoveredTab}>
        Contact Us
      </Tab>
      <Cursor position={position} theme={theme} />
    </ul>
  );
};

const Tab = ({ children, setPosition, to, currentPathName, hoveredTab, setHoveredTab, theme }) => {
  const ref = useRef(null);
  const isActive = currentPathName === to;
  const isHovered = hoveredTab === to;

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
        setHoveredTab(to);
      }}
      className={`relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase md:px-5 md:py-3 md:text-base transition-colors duration-200 ${
        isActive ? 'bg-black text-white rounded-lg' : isHovered ? 'bg-gray-700 text-white rounded-lg' : theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      <Link to={to} className="block w-full">
        {children}
      </Link>
    </li>
  );
};

// Cursor animation component
const Cursor = ({ position, theme }) => {
  return (
    <motion.li
      animate={position}
      className={`absolute z-0 h-7 rounded-lg md:h-12 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-300"
      }`}
    />
  );
};

export default SlideTabsExample;
