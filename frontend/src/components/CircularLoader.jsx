import React from "react";

const CircularLoader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-6 h-6 border-4 border-white border-t-4 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default CircularLoader;
