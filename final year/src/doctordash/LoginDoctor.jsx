import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../data/DoctorContext";
import doctorsData from "../data/doctorsData";
import axios from "axios";

const LoginDoctor = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedInDoctorEmail } = useContext(DoctorContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // 1️⃣ Check with backend DB
      const res = await axios.post("https://medicare-hospital-management-system-3.onrender.com/api/doctor/login", {
        email,
        password,
      });

      if (res.data && res.data.doctor) {
        setLoggedInDoctorEmail(res.data.doctor.email);
        localStorage.setItem(
          "user",
          JSON.stringify({ role: "doctor", email: res.data.doctor.email, name: res.data.doctor.name })
        );
        localStorage.setItem("token", res.data.token);
        navigate("/doctordashboard");
        return;
      }
    } catch (err) {
      console.warn("DB login failed, checking static file...");
    }

    // 2️⃣ If DB check fails → fallback to static doctorsData.js
    const doctor = doctorsData.find(
      (d) => d.email === email && d.password === password
    );
    if (doctor) {
      setLoggedInDoctorEmail(doctor.email);
      localStorage.setItem(
        "user",
        JSON.stringify({ role: "doctor", email: doctor.email, name: doctor.name })
      );
      navigate("/doctordashboard");
    } else {
      alert("Doctor not found or incorrect email/password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/387/387561.png"
          alt="Doctor Avatar"
          className="w-20 h-20 mb-4 rounded-full shadow"
        />
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-2">Welcome Doctor</h2>
        <p className="text-center text-gray-500 mb-6">Sign in with your registered email and password</p>
        <div className="w-full">
          <label className="block text-gray-700 mb-1 font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label className="block text-gray-700 mb-1 font-semibold">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-bold hover:bg-blue-700 transition duration-200 shadow"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginDoctor;