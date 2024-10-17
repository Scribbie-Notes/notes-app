import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Accept theme as a prop in SlideTabsExample
export const SlideTabsExample = ({ theme }) => {
  return (
    <div className={theme === "dark" ? "bg-gray-800" : "bg-white py-2"}>
      <SlideTabs theme={theme} /> {/* Pass theme to SlideTabs */}
    </div>
  );
};

const SlideTabs = ({ theme }) => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
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

      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, setPosition, to, theme }) => {
  const ref = useRef(null);

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
      }}
      className={`relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase ${
        theme === "dark" ? "text-white mix-blend-difference" : "text-black"
      } md:px-5 md:py-3 md:text-base`} // Set text color based on theme
    >
      <Link to={to}>
        {children}
      </Link>
    </li>
  );
};

// Cursor animation component
const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-lg bg-black md:h-12"
    />
  );
};

export default SlideTabsExample;
