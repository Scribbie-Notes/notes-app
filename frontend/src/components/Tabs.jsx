import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Main component that decides the theme and renders SlideTabs
export const SlideTabsExample = ({ theme }) => {
  return (
    <div className={theme === "dark" ? "bg-slate-800" : "bg-white py-2"}>
      <SlideTabs theme={theme} />
    </div>
  );
};

// SlideTabs component that handles rendering the tabs
const SlideTabs = ({ theme }) => {
  const location = useLocation();
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const [hoveredTab, setHoveredTab] = useState(null);
  const currentPathName = location.pathname;

  return (
    <ul
      onMouseLeave={() => {
        setPosition((prev) => ({ ...prev, opacity: 0 }));
        setHoveredTab(null);
      }}
      className={`relative mx-auto flex w-fit p-1 flex-col md:flex-row gap-5 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      {/* <Tab
        theme={theme}
        setPosition={setPosition}
        to="/calendar"
        currentPathName={currentPathName}
        hoveredTab={hoveredTab}
        setHoveredTab={setHoveredTab}
      >
        Calendar
      </Tab> */}
      <Cursor position={position} theme={theme} />
    </ul>
  );
};

// Tab component that renders individual tabs
const Tab = ({
  children,
  setPosition,
  to,
  currentPathName,
  hoveredTab,
  setHoveredTab,
  theme,
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
        setPosition({ left: ref.current.offsetLeft, width, opacity: 1 });
        setHoveredTab(to);
      }}
      className={`relative z-10 mt-1.5 cursor-pointer text-xs 
        ${isActive ? "bg-black text-white rounded-lg" : "text-black"}
        ${isHovered && !isActive ? "bg-gray-700 text-white rounded-lg" : ""}
        ${theme === "dark" && !isActive && !isHovered ? "text-white" : ""}
        hover:bg-gray-700 hover:text-white`}
    >
      <Link to={to} className="block w-full text-center">
        {children}
      </Link>
    </li>
  );
};

// Cursor component for the sliding effect
const Cursor = ({ position, theme }) => {
  return (
    <li
      style={{
        left: position.left,
        width: position.width,
        opacity: position.opacity,
      }}
      className={`absolute z-0 h-2 rounded-lg md:h-12 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-300"
      }`}
    />
  );
};

export default SlideTabsExample;