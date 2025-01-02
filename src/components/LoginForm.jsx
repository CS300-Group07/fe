import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../constants/routes";


const LoginForm = () => {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        console.log(`Email: ${email}, Password: ${password}`);
        navigate(routes.APP);
    };
  return (
    <div>
      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
            type="email"
            id="email"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
            type="password"
            id="password"
            placeholder="********"
            required
          />
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
              Remember me
            </label>
          </div>
          <a href="#" className="text-sm text-purple-600 hover:underline">
            Forgot Password?
          </a>
        </div>
        <button
          className="w-full py-3 font-semibold text-white bg-purple-600 rounded-lg shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-200"
          type="submit"
        >
          Sign In
        </button>
      </form>
      {/* Divider */}
      <div className="flex items-center my-6">
        <hr className="w-full border-gray-300" />
        <span className="px-3 text-gray-500">or</span>
        <hr className="w-full border-gray-300" />
      </div>
      {/* Social Login Buttons */}
      <div className="flex justify-center space-x-4">
        {/* Facebook Button */}
        <button
          className="flex items-center justify-center w-10 h-10 text-white rounded-full bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Sign in with Facebook"
        >
          {/* Facebook Icon */}
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M22 12.07c0-5.52-4.48-10-10-10S2 6.55 2 12.07c0 4.99 3.66 9.12 8.44 9.88v-6.99h-2.54v-2.89h2.54V9.83c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.25c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.89h-2.34V22c4.78-.77 8.44-4.89 8.44-9.93z" />
          </svg>
        </button>
        {/* Twitter Button */}
        <button
          className="flex items-center justify-center w-10 h-10 text-white rounded-full bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label="Sign in with Twitter"
        >
          {/* Twitter Icon */}
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43 0c-1 .6-2.15 1-3.36 1.28A4.48 4.48 0 0 0 16.16 0a4.48 4.48 0 0 0-4.48 4.49c0 .35.04.7.11 1.03a12.8 12.8 0 0 1-9.29-4.7 4.5 4.5 0 0 0-.61 2.26c0 1.56.79 2.93 1.98 3.74a4.5 4.5 0 0 1-2.04-.56v.06C4.52 9.01 7.12 10 9.99 10a4.5 4.5 0 0 1-2.03.08c.57 1.78 2.24 3.08 4.2 3.11A9 9 0 0 1 0 18.5a12.8 12.8 0 0 0 6.93 2.03c8.33 0 12.89-6.93 12.89-12.94 0-.2 0-.39-.01-.58A9.3 9.3 0 0 0 23 3z" />
          </svg>
        </button>
        {/* Google Button */}
        <button
          className="flex items-center justify-center w-10 h-10 text-white rounded-full bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Sign in with Google"
        >
          {/* Google Icon */}
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M21.35 11.1h-9.18v2.7h5.22c-.45 1.91-2.21 2.97-5.22 2.97-3.16 0-5.74-2.6-5.74-5.77s2.58-5.77 5.74-5.77c1.67 0 3.17.7 4.25 1.83l2.81-2.8C17.76 2.54 15.06 1.37 12 1.37 6.48 1.37 2 5.82 2 11.33S6.48 21.3 12 21.3c5.64 0 10.05-4.15 10.05-9.97 0-.67-.07-1.32-.2-1.93h-.5z" />
          </svg>
        </button>
      </div>
      {/* Sign Up Link */}
      <p className="mt-8 text-sm text-center text-gray-700">
        Don't have an account?{" "}
        <a href="#" className="text-purple-600 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default LoginForm;