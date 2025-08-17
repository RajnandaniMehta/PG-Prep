import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { logo, saveLife } from "../assets/imageExport";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const api = import.meta.env.VITE_API_URL;
  const handleSubmit = async (e) => {
    
    try {
      e.preventDefault();
      const { data } = await axios.post(
        `${api}/users/login`,
        { username, password },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      if (data.success) {
        const redirectPath =
          sessionStorage.getItem("redirectTo") || `/user/${data.userId}`;
        sessionStorage.removeItem("redirectTo");
        navigate(redirectPath);
      } else {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${saveLife})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <main className="flex-grow flex items-center justify-center px-4 relative z-10 mt-20 sm:mt-25">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-7 rounded-xl shadow-lg border border-white/40">
          {/* Logo + Title */}
          <div className="flex items-center justify-center mb-3">
            <img
              src={logo}
              alt="Logo"
              className="w-14 h-14 rounded-full shadow-md object-cover border-2 border-white"
            />
          </div>
          <h1 className="text-3xl font-bold text-center text-sky-700 mb-3">
            Login
          </h1>

          <p className="text-center text-gray-600 mb-6">
            Please login to continue your preparation
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block mb-1 font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-1 font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-sky-600 text-white py-2 rounded-lg font-semibold
                         hover:bg-sky-700 transition duration-300"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-700 mt-4">
            New here?{" "}
            <Link
              to="/signup"
              className="text-sky-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Login;
