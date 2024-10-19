import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

// Accept theme as a prop in SlideTabsExample
export const SlideTabsExample = ({ theme }) => {
  return (
    <div className={theme === "dark" ? "bg-gray-800" : "bg-white py-2"}>
      <SlideTabs theme={theme} /> {/* Pass theme to SlideTabs */}
    </div>
  );
};


const SlideTabs = ({ theme }) => {

const SlideTabs = () => {
  const location = useLocation();

  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const currentPathName = location.pathname;
  const [hoveredTab, setHoveredTab] = useState(null);

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
        setHoveredTab(null);
      }}
      className={`relative mx-auto flex w-fit p-1 ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`} // Set background color based on theme
    >

      <Tab theme={theme} setPosition={setPosition} to="/">Home</Tab>
      <Tab theme={theme} setPosition={setPosition} to="/about">About</Tab>
      <Tab theme={theme} setPosition={setPosition} to="/testimonial">Testimonial</Tab>
      <Tab theme={theme} setPosition={setPosition} to="/pricing">Pricing</Tab>
      <Tab theme={theme} setPosition={setPosition} to="/contact-us">Contact Us</Tab>

      <Tab
        setPosition={setPosition}
        currentPathName={currentPathName}
        to="/dashboard"
        hoveredTab={hoveredTab}
        setHoveredTab={setHoveredTab}
      >
        Home
      </Tab>
      <Tab
        setPosition={setPosition}
        currentPathName={currentPathName}
        to="/about"
        hoveredTab={hoveredTab}
        setHoveredTab={setHoveredTab}
      >
        About
      </Tab>
      <Tab
        setPosition={setPosition}
        currentPathName={currentPathName}
        to="/testimonial"
        hoveredTab={hoveredTab}
        setHoveredTab={setHoveredTab}
      >
        Testimonial
      </Tab>
      <Tab
        setPosition={setPosition}
        currentPathName={currentPathName}
        to="/pricing"
        hoveredTab={hoveredTab}
        setHoveredTab={setHoveredTab}
      >
        Pricing
      </Tab>
      <Tab
        setPosition={setPosition}
        currentPathName={currentPathName}
        to="/contact-us"
        hoveredTab={hoveredTab}
        setHoveredTab={setHoveredTab}
      >
        Contact Us
      </Tab>


      <Cursor position={position} theme={theme} />
    </ul>
  );
};

const Tab = ({ children, setPosition, to, theme }) => {

const Tab = ({ 
  children, 
  setPosition, 
  to, 
  currentPathName,
  hoveredTab,
  setHoveredTab 
}) => {

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

      className={`relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase md:px-5 md:py-3 md:text-base ${
        theme === "dark"
          ? "text-white hover:bg-gray-900 rounded-lg" 
          : "text-black hover:bg-black hover:text-white rounded-lg" 
      }`}
    >
      <Link to={to}>

      className={`relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase md:px-5 md:py-3 md:text-base transition-colors duration-200 ${
        isActive ? 'bg-black text-white rounded-lg' : isHovered ? 'text-white' : 'text-black'
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

const Cursor = ({ position }) => {

  return (
    <motion.li
      animate={{
        ...position,
      }}
      className={`absolute z-0 h-7 rounded-lg md:h-12 ${
        theme === "dark" ? "" : ""
      }`} // Add background color based on theme
    />
  );
};

export default SlideTabsExample;