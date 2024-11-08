import { useState, useEffect } from "react";

const ProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Update progress bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.pageYOffset;
      const scrollPercentage = (scrollPosition / totalHeight) * 100;
      setScrollProgress(scrollPercentage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className="progress-bar-container"
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          zIndex: "10",
          height: "7.5px",
        }}
      >
        {/* Glowing Progress Bar */}
        <div
          className="progress-bar"
          style={{
            border: "none",
            borderRadius: "2rem",
            height: "100%",
            width: `${scrollProgress}%`,
            background:
              "linear-gradient(90deg,#fff, #BBDEFB, #1694DB,#5C6BC0,#2751BD)",
            boxShadow: "0 0 8px #BBDEFB, 0 0 18px #2751BD, 0 0 25px #2d04d1",
          }}
        ></div>
      </div>
    </>
  );
};

export default ProgressBar;