import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const email = userData.email;

      try {
        const res = await axios.get(
          `https://medicare-hospital-management-system-3.onrender.com/api/appointments?email=${email}`
        );
        console.log("Appointment data received:", res.data);
        setAppointments(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch appointments", err);
        setAppointments([]);
      }
    };

    fetchAppointments();
  }, []);

  const statusBadge = (status) => {
    const base = "px-3 py-1 rounded-full text-sm font-bold";
    if (status === "Approved") return `${base} bg-green-100 text-green-700`;
    if (status === "Pending") return `${base} bg-yellow-100 text-yellow-800`;
    if (status === "Cancelled") return `${base} bg-red-100 text-red-700`;
    return `${base} bg-gray-100 text-gray-700`;
  };

  const paymentBadge = (paymentStatus) => {
    const base = "px-3 py-1 rounded-full text-sm font-bold";
    if (paymentStatus === "Paid") return `${base} bg-green-100 text-green-700`;
    if (paymentStatus === "Pending") return `${base} bg-orange-100 text-orange-700`;
    return `${base} bg-gray-100 text-gray-700`;
  };

  // ✅ Cancel appointment function
  const handleCancel = async (id, paymentStatus) => {
    if (paymentStatus === "Paid") {
      alert("⚠️ This appointment cannot be cancelled because payment is already done online.");
      return;
    }

    try {
      await axios.put(`https://medicare-hospital-management-system-3.onrender.com/api/appointments/cancel/${id}`);

      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: "Cancelled" } : appt
        )
      );
      alert("Appointment cancelled successfully.");
    } catch (err) {
      console.error("Failed to cancel appointment", err);
      alert("Failed to cancel appointment. Please try again.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-extrabold text-blue-800 text-center mb-8 tracking-wide uppercase">
        My Appointments
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full table-auto bg-white border ">
          <thead className="bg-blue-600 text-white uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left font-bold">Doctor</th>
              <th className="py-3 px-6 text-left font-bold">Date</th>
              <th className="py-3 px-6 text-left font-bold">Time</th>
              <th className="py-3 px-6 text-left font-bold">Reason</th>
              <th className="py-3 px-6 text-left font-bold">Status</th>
              <th className="py-3 px-6 text-left font-bold">Payment</th>
              <th className="py-3 px-6 text-left font-bold">Prescription</th>
              <th className="py-3 px-6 text-left font-bold">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm font-medium divide-y divide-gray-200">
            {appointments.length > 0 ? (
              appointments
                .slice()
                .reverse()
                .map((appt, index) => (
                  <tr
                    key={index}
                    className="hover:bg-blue-50 transition duration-150"
                  >
                    <td className="py-4 px-6">{appt.doctorName}</td>
                    <td className="py-4 px-6">{appt.date}</td>
                    <td className="py-4 px-6">{appt.time}</td>
                    <td className="py-4 px-6">{appt.reason}</td>
                    <td className="py-4 px-6">
                      <span className={statusBadge(appt.status)}>
                        {appt.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={paymentBadge(appt.paymentStatus)}>
                        {appt.paymentStatus || "Pending"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {Array.isArray(appt.prescription) &&
                      appt.prescription.length > 0 ? (
                        <button
                          className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700"
                          onClick={() => {
                            const userData = JSON.parse(
                              localStorage.getItem("user") || "{}"
                            );

                            navigate("/prescription-view", {
                              state: {
                                prescription: appt.prescription,
                                doctorName: appt.doctorName,
                                date: appt.date,
                                time: appt.time,
                                patientEmail:
                                  appt.patientEmail || userData.email,
                              },
                            });
                          }}
                        >
                          View
                        </button>
                      ) : (
                        <span className="text-gray-400 italic">
                          No prescription
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {appt.status !== "Cancelled" ? (
                        <button
                          className="px-3 py-1 bg-red-600 text-white rounded text-xs font-semibold hover:bg-red-700"
                          onClick={() =>
                            handleCancel(appt._id, appt.paymentStatus)
                          }
                        >
                          Cancel
                        </button>
                      ) : (
                        <span className="text-gray-400 italic">
                           Cancelled
                        </span>
                      )}
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointments;