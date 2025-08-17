import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";

const BookAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state?.doctor;

  const userData = JSON.parse(localStorage.getItem("user") || "{}");

  const [form, setForm] = useState({
    name: "",
    date: "",
    time: "",
    reason: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("offline");
  const [statusMessage, setStatusMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  // Always ensure doctor fee is set, else fallback 500
  const appointmentData = {
    patientName: form.name,
    patientEmail: userData.email,
    doctorName: doctor.name,
    doctorEmail: doctor.email,
    date: form.date,
    time: form.time,
    reason: form.reason,
    status: "Pending",
    amount: 500,  // 👈 Default fee 500
  };

  if (paymentMethod === "offline") {
    try {
      await axios.post("http://localhost:5000/api/appointments/create", {
        ...appointmentData,
        paymentStatus: "Unpaid",
      });
      setStatusMessage({
        type: "success",
        text: "✅ Appointment Confirmed (Offline Payment)!",
      });
      setTimeout(() => navigate("/my-appointments"), 1500);
    } catch (error) {
      console.error(error);
      setStatusMessage({
        type: "error",
        text: "❌ Failed to book appointment",
      });
    }
  } else {
    try {
      // Save details temporarily for after Stripe redirect
      localStorage.setItem("pendingAppointment", JSON.stringify(appointmentData));

      const res = await axios.post(
        "http://localhost:5000/api/payment/create-checkout-session",
        {
          doctorName: doctor.name,
          amount: 500,  // 👈 Same default fee logic
          appointmentData,
        }
      );

      window.location.href = res.data.url; // Redirect to Stripe
    } catch (error) {
      console.error(error);
      setStatusMessage({
        type: "error",
        text: "❌ Payment session creation failed",
      });
    }
  } 
};

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Book Appointment
          </h2>
          <p className="text-center text-gray-600 text-sm mb-4">
            with{" "}
            <span className="font-semibold text-blue-600">{doctor.name}</span>{" "}
            ({doctor.specialization})
          </p>

          {statusMessage && (
            <div
              className={`mb-4 text-center font-semibold ${
                statusMessage.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {statusMessage.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              placeholder="Reason for Appointment"
              rows="3"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* Payment Method Selection */}
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="offline"
                  checked={paymentMethod === "offline"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Offline Payment
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Online Payment
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
            >
              Confirm Appointment
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookAppointment;
