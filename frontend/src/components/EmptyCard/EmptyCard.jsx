import React from "react";

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="container h-screen flex items-center justify-center p-6 pb-12">
      <div className="flex flex-col items-center justify-center">
        <img src={imgSrc} alt="Empty Card" className="w-60 h-44" />
        <p className="w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-8">
          {message}
        </p>
      </div>
    </div>
  );
};

export default EmptyCard;
