import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("https://medicare-hospital-management-system-3.onrender.com/api/appointments/all");
      setAppointments(res.data);
    } catch (err) {
      console.error("Failed to fetch appointments", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`https://medicare-hospital-management-system-3.onrender.com/api/appointments/${id}/status`, {
        status: newStatus,
      });

      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: newStatus } : appt
        )
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;

    try {
      await axios.delete(`https://medicare-hospital-management-system-3.onrender.com/api/appointments/delete/${id}`);
      alert("Appointment deleted");
      fetchAppointments();
    } catch (error) {
      console.error("Error deleting appointment", error);
      alert("Failed to delete");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center uppercase">
        Appointments
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-blue-600 text-white text-sm">
            <tr>
              <th className="px-4 py-2 text-left">Patient</th>
              <th className="px-4 py-2 text-left">Doctor</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Reason</th>
              <th className="px-4 py-2 text-left">Payment</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {appointments.slice().reverse().map((appt) => (
              <tr key={appt._id} className="border-b hover:bg-gray-50 transition">
                <td className="px-4 py-2 font-semibold">
                  {appt.patientName?.trim() !== "" ? appt.patientName : "Not Provided"}
                </td>
                <td className="px-4 py-2">{appt.doctorName || "Not Provided"}</td>
                <td className="px-4 py-2">{appt.date}</td>
                <td className="px-4 py-2">{appt.time}</td>
                <td className="px-4 py-2">
                  {appt.patientEmail?.trim() !== "" ? appt.patientEmail : "Not Provided"}
                </td>
                <td className="px-4 py-2 italic">{appt.reason || "-"}</td>
                <td className="px-4 py-2 font-semibold">
                  {appt.paymentStatus || "Pending"}
                </td>
                <td className="px-4 py-2">
                  <select
                    value={appt.status}
                    onChange={(e) => handleStatusChange(appt._id, e.target.value)}
                    className="text-xs border rounded px-2 py-1 bg-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(appt._id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"
                  >
                    <FaTrashAlt className="text-xs" /> Delete
                  </button>
                </td>
              </tr>
            ))}

            {appointments.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500 italic">
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAppointments;