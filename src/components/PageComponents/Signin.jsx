import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Hardcoded user credentials
    const validUsername = "kirantalele@spit";
    const validPassword = "kt@spit1234";

    if (username === validUsername && password === validPassword) {
      // Successful login
      console.log("User logged in successfully");
      setLoggedIn(true);
      // Redirect user or perform additional actions based on authentication result
      navigate("/edit/home");
    } else {
      // Handle authentication error
      setError("Invalid username or password");
    }
  };

  // Redirect to home if already logged in
  if (isLoggedIn) {
    navigate("/edit/home");
  }

  return (
    <div className="mt-40">
      <form>
        <h3 className="text-gray-900 text-lg font-medium title-font mb-5">Login</h3>
        <div className="relative mb-4">
        <label className="leading-7 text-sm text-gray-600">
          Username:
          <input
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        </div>
        <div className="relative mb-4">
        <label className="leading-7 text-sm text-gray-600">
          Password:
          <input
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        </div>
        <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" type="button" onClick={handleLogin}>
          Login
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
    
  );
}

export default Signin;
