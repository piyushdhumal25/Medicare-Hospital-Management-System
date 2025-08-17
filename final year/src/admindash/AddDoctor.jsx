import React, { useState } from "react";
import Sidebar from "./Sidebar";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDoctor = () => {
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    password: "",
    specialty: "",
    experience: "",
    fee: "",
    rating: "",
    category: "",
    available: "",
    availability: "",
    education: "",
    certificate: ""
  });

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...doctor,
        available: doctor.available.split(",").map((item) => item.trim())
      };

      const token = localStorage.getItem("token");

      const res = await axios.post(`http://localhost:5000/api/admin/add-doctor`,
        payload,
        {
          headers: {
            Authorization:`Bearer ${token}`
          }
        }
      );

      alert(res.data.message || "Doctor added successfully!");
      navigate("/admin/dashboard/doctors-list");
    } catch (err) {
      if (err.response) {
        alert(err.response.data.error || "Failed to add doctor.");
      } else {
        alert("Something went wrong.");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Add New Doctor</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { label: "Name", name: "name" },
              { label: "Email", name: "email" },
              { label: "Password", name: "password" },
              { label: "Specialty", name: "specialty" },
              { label: "Experience (years)", name: "experience" },
              { label: "Fee (e.g. ₹800)", name: "fee" },
              { label: "Rating (e.g. 4.5)", name: "rating" },
              { label: "Category", name: "category" },
              { label: "Available At (comma-separated)", name: "available" },
              { label: "Availability (e.g. Mon-Fri)", name: "availability" },
              { label: "Education", name: "education" },
              { label: "Certificate", name: "certificate" }
            ].map(({ label, name }) => (
              <div key={name}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
                <input
                  type="text"
                  name={name}
                  value={doctor[name]}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Add Doctor
            </button>
          </form>
        </div>
      </div>
    </div>
    
  );
};

export default AddDoctor;