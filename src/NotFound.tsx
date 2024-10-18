import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#151515] text-center p-4">
      <div>
        <h1 className="text-6xl font-bold text-gray-800 dark:text-white">
          404
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Oops! The page you're looking for doesn't exist.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
