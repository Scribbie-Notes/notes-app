import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);

  // Simulate loading completion and percentage increment
  useEffect(() => {
    const loadingInterval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(loadingInterval);
          setTimeout(() => setLoading(false), 800); // Wait for exit animation to complete
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(loadingInterval);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1.4, ease: [0.83, 0, 0.17, 1] }}
            className="fixed top-0 left-0 w-full h-full bg-black z-50 flex items-center justify-center overflow-hidden"
          >
            {/* Loading Percentage */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute bottom-16 right-12 text-white text-8xl sm:text-9xl font-bold"
            >
              {percentage}
            </motion.div>

            {/* Loading Bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              exit={{ width: 0 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
              className="absolute bottom-10 left-0 h-1 bg-white rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Preloader;
