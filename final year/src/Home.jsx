import React from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero"; // adjust path if Hero is elsewhere

export default function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // check login

  return (
    <div id="home">
      <Hero />
      <div className="text-center mt-6 flex justify-center gap-4">
        {user && (
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </button>
        )}
        <button
          onClick={() => navigate("/contact")}
          className="bg-green-600 text-white px-6 py-3 rounded-full shadow hover:bg-green-700 transition"
        >
          Contact
        </button>
        <button
          onClick={() => navigate("/donate")}
          className="bg-red-600 text-white px-6 py-3 rounded-full shadow hover:bg-red-700 transition"
        >
          Donate
        </button>
      </div>
    </div>
  );
}