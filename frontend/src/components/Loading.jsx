import React from 'react';

const Loading = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div> {/* Semi-transparent background */}
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8"></div>
        </div>
    );
};

export default Loading;
