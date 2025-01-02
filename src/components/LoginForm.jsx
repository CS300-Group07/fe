import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../constants/routes";
import axios from 'axios'; // Import axios

const LoginForm = () => {
  const navigate = useNavigate();

  // Make handleSubmit async to use await inside
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const username = e.target.elements.username.value; // Get username
    const password = e.target.elements.password.value; // Get password
    console.log(`Username: ${username}, Password: ${password}`);

    // Encode the username and password to safely include them in the URL
    const encodedUsername = encodeURIComponent(username);
    const encodedPassword = encodeURIComponent(password);
    const url = `http://localhost:5002/login/${encodedUsername}/${encodedPassword}`;

    try {
      // Send the POST request using axios
      const response = await axios.post(url);
      // Print the response to the console
      console.log(response.data);

      // if not null 
      if (response.data['cookies'] !== null) {
        // Navigate to the app route on successful login
        navigate(routes.APP);
      } else {
        // Handle login failure (e.g., show an error message)
        console.error('Login failed:', response.data.message);
      }
    } catch (error) {
      // Handle errors from the request
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="username" // Updated to "username"
          >
            Username
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
            type="text"
            id="username" // Updated to "username"
            name="username" // Added name attribute
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
            name="password" // Added name attribute
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
        {/* Social buttons (Facebook, Twitter, Google) */}
        {/* ... (Your existing social login buttons) ... */}
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
