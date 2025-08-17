import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // clear previous error

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      const user = res.data.user;
      const token = res.data.token;

      // ✅ Save token and user to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userEmail", user.email); // ✅ Store user's email

      // ✅ Navigate based on role
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "doctor") {
        navigate("/doctor/dashboard");
      } else {
        navigate("/patient/dashboard");
      }

    } catch (err) {
      const errorMsg =
        err.response?.data?.msg || "Login failed. Please check your credentials.";
      setError(errorMsg);
    }
  };

  return (
    <section className="min-h-screen  flex">
      {/* Left: Image Section */}
      <div className="w-[60%] hidden md:flex items-center justify-center bg-blue-100">
        <img
          src="loginpage.svg"
          alt="Login Illustration"
          className="w-[90%] h-auto object-contain"
        />
      </div>

      {/* Right: Login Form */}
      <div className="w-full md:w-[40%] flex items-center justify-center bg-white shadow-lg">
        <div className="w-full px-8">
          <h2 className="text-5xl font-bold text-center text-blue-600 mb-6">
            Login
          </h2>

          {error && (
            <p className="text-red-500 text-center text-lg mb-4">{error}</p>
          )}

          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Email */}
            <div>
              <label className="block mb-1 text-gray-700 text-2xl">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-gray-700 text-2xl">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-[20px]"
            >
              Log In
            </button>

            {/* Links */}
            <div className="flex justify-between mt-3 text-[15px] text-gray-600">
              <a href="#" className="hover:underline">Forgot?</a>
              <Link to="/SignUp" className="hover:underline">Sign Up</Link>      
            </div>

            <div className="doctor-login-link mt-5 text-center">
  <p className="text-lg font-semibold text-gray-800 mb-3">Are you a doctor?</p>
  <Link to="/logindoctor">
    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition duration-300">
      Login as Doctor
    </button>
  </Link>
</div>


          </form>
        </div>
      </div>
    </section>
  );
}