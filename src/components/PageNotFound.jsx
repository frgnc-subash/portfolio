import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center text-white bg-black">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
};

export default PageNotFound;