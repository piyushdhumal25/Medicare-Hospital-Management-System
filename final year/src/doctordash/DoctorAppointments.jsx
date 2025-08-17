import React, { useEffect, useState, useContext } from "react";
import { DoctorContext } from "../data/DoctorContext";
import axios from "axios";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { loggedInDoctorEmail } = useContext(DoctorContext);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!loggedInDoctorEmail) return;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/appointments/doctor?email=${loggedInDoctorEmail}`
        );
        setAppointments(res.data);
      } catch (error) {
        console.error("Error fetching doctor appointments:", error);
      }
    };

    fetchAppointments();
  }, [loggedInDoctorEmail]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}/status`, {
        status: newStatus,
      });

      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: newStatus } : appt
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 border-green-300";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      case "Pending":
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
    }
  };

  const getPaymentClass = (payment) => {
    switch (payment) {
      case "Paid":
        return "bg-green-100 text-green-700 border-green-300";
      case "Pending":
      default:
        return "bg-red-100 text-red-700 border-red-300";
    }
  };

  return (
    <div className="px-6 py-10 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <h2 className="text-4xl font-extrabold text-blue-700 mb-10 text-center tracking-tight">
        🩺 Your Appointments
      </h2>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No appointments found.</p>
      ) : (
        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          {appointments.slice().reverse().map((appt) => (
            <div
              key={appt._id}
              className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition duration-300"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    👤 {appt.patientName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">📧 {appt.email}</p>
                  <p className="text-sm text-gray-600">
                    📅 {appt.date} at 🕒 {appt.time}
                  </p>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="flex gap-2 items-center">
                    <span
                      className={`inline-block px-4 py-1 rounded-full text-sm font-semibold border ${getStatusClass(
                        appt.status
                      )}`}
                    >
                      {appt.status}
                    </span>
                    <span
                      className={`inline-block px-4 py-1 rounded-full text-sm font-semibold border ${getPaymentClass(
                        appt.paymentStatus
                      )}`}
                    >
                      {appt.paymentStatus || "Pending"}
                    </span>
                  </div>
                  <div className="mt-4">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Update Status:
                    </label>
                    <select
                      className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={appt.status}
                      onChange={(e) => handleStatusChange(appt._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;