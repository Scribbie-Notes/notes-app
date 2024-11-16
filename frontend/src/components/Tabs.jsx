import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Accept theme as a prop in SlideTabsExample
export const SlideTabsExample = ({ theme }) => {
  return (
    <div className={theme === "dark" ? "bg-slate-800" : "bg-white py-2"}>
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
      className={`relative mx-auto flex w-fit p-1 flex-col md:flex-row gap-5  ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      {/* <Tab
        theme={theme}
        setPosition={setPosition}
        to="/"
        currentPathName={currentPathName}
        hoveredTab={hoveredTab}
        setHoveredTab={setHoveredTab}
      >
        Home
      </Tab>
      <Tab
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
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
        setHoveredTab(to);
      }}
      className={`relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase md:px-5 md:py-3 md:text-base ${
        isActive
          ? "bg-black text-white rounded-lg"
          : isHovered
          ? "bg-gray-700 text-white rounded-lg"
          : theme === "dark"
          ? "text-white"
          : "text-black"
      }`}
    >
      <Link to={to} className="block w-full text-center">
        {children}
      </Link>
    </li>
  );
};

// Cursor component without animation
const Cursor = ({ position, theme }) => {
  return (
    <li
      style={{
        left: position.left,
        width: position.width,
        opacity: position.opacity,
      }}
      className={`absolute z-0 h-7 rounded-lg md:h-12 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-300"
      }`}
    />
  );
};

export default SlideTabsExample;
