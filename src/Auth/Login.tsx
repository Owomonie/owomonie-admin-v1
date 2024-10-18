import React from "react";

const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#EAEAEA] dark:bg-[#151515]">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg dark:bg-[#232323]">
        <div className="flex justify-center mb-4">
          <img
            src="/logo.png"
            alt="Owomonie"
            className="h-16"
          />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Owomonie Admin Login
        </h2>
        <form className="mt-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="mt-4">
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 px-4 py-4 text-md font-medium text-white bg-[#1F79B0] rounded-md hover:opacity-85 focus:outline-none focus:ring focus:ring-blue-300">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
