import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../constants/routes";
import axios from 'axios';

// Custom Open Eye Icon
const EyeIcon = () => (
  <svg fill = "none" viewBox="0 0 20 10" className="w-6 h-6">
    <path stroke = "none" fill = "#000" fillOpacity=".54" fill-rule = "evenodd"
    d="M19.975 5.823V5.81 5.8l-.002-.008v-.011a.078.078 0 01-.002-.011v-.002a.791.791 0 00-.208-.43 13.829 13.829 0 00-1.595-1.64c-1.013-.918-2.123-1.736-3.312-2.368-.89-.474-1.832-.867-2.811-1.093l-.057-.014a2.405 2.405 0 01-.086-.02L11.884.2l-.018-.003A9.049 9.049 0 0010.089 0H9.89a9.094 9.094 0 00-1.78.197L8.094.2l-.016.003-.021.005a1.844 1.844 0 01-.075.017l-.054.012c-.976.226-1.92.619-2.806 1.09-1.189.635-2.3 1.45-3.31 2.371a13.828 13.828 0 00-1.595 1.64.792.792 0 00-.208.43v.002c-.002.007-.002.015-.002.022l-.002.01V5.824l-.002.014a.109.109 0 000 .013L0 5.871a.206.206 0 00.001.055c0 .01 0 .018.002.027 0 .005 0 .009.003.013l.001.011v.007l.002.01.001.013v.002a.8.8 0 00.208.429c.054.067.11.132.165.197a13.9 13.9 0 001.31 1.331c1.043.966 2.194 1.822 3.428 2.48.974.52 2.013.942 3.09 1.154a.947.947 0 01.08.016h.003a8.864 8.864 0 001.596.16h.2a8.836 8.836 0 001.585-.158l.006-.001a.015.015 0 01.005-.001h.005l.076-.016c1.079-.212 2.118-.632 3.095-1.153 1.235-.66 2.386-1.515 3.43-2.48a14.133 14.133 0 001.474-1.531.792.792 0 00.208-.43v-.002c.003-.006.003-.015.003-.022v-.01l.002-.008c0-.004 0-.009.002-.013l.001-.012.001-.015.001-.019.002-.019a.07.07 0 01-.01-.036c0-.009 0-.018-.002-.027zm-6.362.888a3.823 3.823 0 01-1.436 2.12l-.01-.006a3.683 3.683 0 01-2.178.721 3.67 3.67 0 01-2.177-.721l-.009.006a3.823 3.823 0 01-1.437-2.12l.014-.01a3.881 3.881 0 01-.127-.974c0-2.105 1.673-3.814 3.738-3.816 2.065.002 3.739 1.711 3.739 3.816 0 .338-.047.662-.128.975l.011.009zM8.145 5.678a1.84 1.84 0 113.679 0 1.84 1.84 0 01-3.679 0z" />
  </svg>
);

// Custom Closed Eye Icon
const EyeOffIcon = () => (
  <svg fill = "none" viewBox="0 0 20 2" className="w-6 h-6">
    <path stroke = "none" fill = "#000" fillOpacity=".54" d="M19.834 1.15a.768.768 0 00-.142-1c-.322-.25-.75-.178-1 .143-.035.036-3.997 4.712-8.709 4.712-4.569 0-8.71-4.712-8.745-4.748a.724.724 0 00-1-.071.724.724 0 00-.07 1c.07.106.927 1.07 2.283 2.141L.631 5.219a.69.69 0 00.036 1c.071.142.25.213.428.213a.705.705 0 00.5-.214l1.963-2.034A13.91 13.91 0 006.806 5.86l-.75 2.535a.714.714 0 00.5.892h.214a.688.688 0 00.679-.535l.75-2.535a9.758 9.758 0 001.784.179c.607 0 1.213-.072 1.785-.179l.75 2.499c.07.321.392.535.677.535.072 0 .143 0 .179-.035a.714.714 0 00.5-.893l-.75-2.498a13.914 13.914 0 003.248-1.678L18.3 6.147a.705.705 0 00.5.214.705.705 0 00.499-.214.723.723 0 00.036-1l-1.82-1.891c1.463-1.071 2.32-2.106 2.32-2.106z" />
  </svg>
);

const LoginForm = () => {
  const navigate = useNavigate();

  // State for password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);

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

      // Check if login is successful
      if (response.data['cookies'] === "cookies") {
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
        {/* Username Input */}
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
            type="text"
            id="username"
            name="username"
            required
          />
        </div>
        {/* Password Input */}
        <div className="mb-6 relative">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
            type={passwordVisible ? "text" : "password"}
            id="password"
            name="password"
            placeholder="********"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-9"
            onClick={() => setPasswordVisible(!passwordVisible)}
            aria-label={passwordVisible ? "Hide password" : "Show password"}
          >
            {passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {/* Remember Me and Forgot Password */}
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
        {/* Submit Button */}
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