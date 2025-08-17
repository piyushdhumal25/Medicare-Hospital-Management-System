import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../admindash/Sidebar';
import Topbar from '../admindash/Topbar';
import Navbar from '../Navbar';
import Dashboard from '../admindash/Dashboard';
import Appointments from '../admindash/Appointments';
import AddDoctor from '../admindash/AddDoctor';
import DoctorsList from '../admindash/Doctorlist';
import DashboardStats from '../admindash/DashboardStats';
import AdminAppointments from '../admindash/Appointments';

const AdminDashboard = () => {
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);

  useEffect(() => {
    // 🩺 Fetch Doctors count
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/doctors');
        if (!response.ok) throw new Error("Failed to fetch doctors");
        const data = await response.json();
        setTotalDoctors(data.length);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    // 🧍 Fetch Patients count
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/patients');
        if (!response.ok) throw new Error("Failed to fetch patients");
        const data = await response.json();
        setTotalPatients(data.length);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    // 📅 Fetch Appointments count
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/appointments/all');
        if (!response.ok) throw new Error("Failed to fetch appointments");
        const data = await response.json();
        setTotalAppointments(data.length);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchDoctors();
    fetchPatients();
    fetchAppointments();
  }, []);

  return (
    <div className="flex h-screen">
      <Navbar />
      <Sidebar />

      <div className="flex flex-col flex-1 bg-gray-50">
        <Topbar />
        <div className="p-4 flex-1 overflow-y-auto">
          <Routes>
            <Route
              index
              element={
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Welcome to Admin Dashboard
                  </h2>

                  {/* ✅ Updated stats with real counts */}
                  <DashboardStats
                    totalDoctors={totalDoctors}
                    totalPatients={totalPatients}
                    totalAppointments={totalAppointments}
                  />
                  
                  {/* ✅ Show all appointments table */}
                  <div className="mt-8">
                    <AdminAppointments />
                  </div>
                </div>
              }
            />
            <Route path="appointments" element={<Appointments />} />
            <Route path="add-doctor" element={<AddDoctor />} />
            <Route path="doctors-list" element={<DoctorsList />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
