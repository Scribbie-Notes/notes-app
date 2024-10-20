import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export const SlideTabsExample = () => {
  return (
    <div className="bg-white  rounded-lg m-2 p-2">
      <SlideTabs />
    </div>
  );
};

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

      <Cursor position={position} />
    </ul>
  );
};

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