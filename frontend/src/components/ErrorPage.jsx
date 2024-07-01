import React from "react";
import { useLocation } from "react-router-dom";

const ErrorPage = () => {
  const location = useLocation();
  const errorCode = location.state?.errorCode || 404;
  const errorMessage = location.state?.errorMessage || "We can't find that page.";
  

  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200">{errorCode}</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500">{errorMessage}</p>

        <a
          href="/"
          className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
