import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "../doctordash/Sidebar";
import Header from "../doctordash/Header";
import DoctorAppointments from "../doctordash/DoctorAppointments";
import DoctorProfile from "../doctordash/DoctorProfile";
import { DoctorContext } from "../data/DoctorContext";

import { FaMoneyBillWave, FaUserInjured, FaCalendarCheck } from "react-icons/fa";
import Navbar from "../Navbar";
import axios from "axios";

const DoctorDashboard = () => {
  const { loggedInDoctorEmail } = useContext(DoctorContext);
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [uniquePatients, setUniquePatients] = useState(0);

  // ✅ Fetch doctor details
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/doctors");
        const data = await res.json();
        const foundDoctor = data.find((doc) => doc.email === loggedInDoctorEmail);
        setDoctor(foundDoctor || null);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    if (loggedInDoctorEmail) {
      fetchDoctor();
    }
  }, [loggedInDoctorEmail]);

  // ✅ Fetch appointments for this doctor
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!loggedInDoctorEmail) return;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/appointments/doctor?email=${loggedInDoctorEmail}`
        );
        setDoctorAppointments(res.data);

        const uniqueEmails = new Set(res.data.map((appt) => appt.patientEmail));
        setUniquePatients(uniqueEmails.size);
      } catch (error) {
        console.error("Error fetching doctor appointments:", error);
      }
    };

    fetchAppointments();
  }, [loggedInDoctorEmail]);

  // ✅ Count only approved appointments
  const approvedAppointmentsCount = doctorAppointments.filter(
    (appt) => appt.status === "Approved"
  ).length;

  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar />
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-8">
          <Routes>
            <Route
              path="/"
              element={
                <div className="space-y-8">
                  {/* Welcome */}
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                      Welcome, {doctor?.name || "Doctor"} 👨‍⚕️
                    </h1>
                    <p className="text-gray-500 mt-1">Here’s today’s snapshot.</p>
                  </div>

                  {/* Stats */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  
  {/* Earnings */}
  <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-5 border border-gray-100 hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300">
    <div className="bg-green-100 p-4 rounded-full">
      <FaMoneyBillWave className="text-3xl text-green-600" />
    </div>
    <div>
      <p className="text-gray-500 text-sm font-medium">Earnings</p>
      <h2 className="text-2xl font-bold text-gray-800">₹1300</h2>
    </div>
  </div>

  {/* Appointments */}
  <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-5 border border-gray-100 hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300">
    <div className="bg-blue-100 p-4 rounded-full">
      <FaCalendarCheck className="text-3xl text-blue-600" />
    </div>
    <div>
      <p className="text-gray-500 text-sm font-medium">Appointments</p>
      <h2 className="text-2xl font-bold text-gray-800">{approvedAppointmentsCount}</h2>
    </div>
  </div>

  {/* Patients */}
  <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-5 border border-gray-100 hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300">
    <div className="bg-purple-100 p-4 rounded-full">
      <FaUserInjured className="text-3xl text-purple-600" />
    </div>
    <div>
      <p className="text-gray-500 text-sm font-medium">Patients</p>
      <h2 className="text-2xl font-bold text-gray-800">{uniquePatients}</h2>
    </div>
  </div>

</div>


                  {/* Profile Overview */}
<div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition duration-300">
  <div className="flex justify-between items-center mb-5 border-b pb-3">
    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
      <span className="bg-blue-100 text-blue-600 p-2 rounded-full">
        🩺
      </span>
      Profile Overview
    </h2>
    <button
      onClick={() => navigate("profile")}
      className="px-4 py-1.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-sm"
    >
      View Full Profile
    </button>
  </div>

  {doctor ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-gray-700 text-sm">
      <div>
        <p className="text-gray-500">Name</p>
        <p className="font-semibold">{doctor.name}</p>
      </div>
      <div>
        <p className="text-gray-500">Specialty</p>
        <p className="font-semibold">{doctor.specialty || doctor.speciality}</p>
      </div>
      <div>
        <p className="text-gray-500">Experience</p>
        <p className="font-semibold">
          {doctor.experience && typeof doctor.experience === "string"
            ? doctor.experience
            : `${doctor.experience} years`}
        </p>
      </div>
      <div>
        <p className="text-gray-500">Email</p>
        <p className="font-semibold">{doctor.email}</p>
      </div>
    </div>
  ) : (
    <p className="text-gray-500 text-sm">Loading doctor details...</p>
  )}
</div>

                </div>
              }
            />
            <Route path="appointments" element={<DoctorAppointments />} />
            <Route path="profile" element={<DoctorProfile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;
