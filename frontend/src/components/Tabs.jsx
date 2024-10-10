import  { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const SlideTabsExample = () => {
  return (
    <div className="bg-white py-2">
      <SlideTabs />
    </div>
  );
};

const SlideTabs = () => {
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
      className="relative mx-auto flex w-fit bg-white p-1"
    >
      <Tab setPosition={setPosition} to="/">Home</Tab>
      <Tab setPosition={setPosition} to="/about">About</Tab>
      <Tab setPosition={setPosition} to="/testimonial">Testimonial</Tab>
      <Tab setPosition={setPosition} to="/pricing">Pricing</Tab>
      <Tab setPosition={setPosition} to="/contact-us">Contact Us</Tab>

      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, setPosition, to }) => {
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
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
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
