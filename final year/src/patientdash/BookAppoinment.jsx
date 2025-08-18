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

    const appointmentData = {
      patientName: form.name,
      patientEmail: userData.email,
      doctorName: doctor.name,
      doctorEmail: doctor.email,
      date: form.date,
      time: form.time,
      reason: form.reason,
      status: "Pending",
      amount: 1500,
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
        localStorage.setItem(
          "pendingAppointment",
          JSON.stringify(appointmentData)
        );

        const res = await axios.post(
          "http://localhost:5000/api/payment/create-checkout-session",
          {
            doctorName: doctor.name,
            amount: 1500,
            appointmentData,
          }
        );

        window.location.href = res.data.url;
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
      <div className="min-h-screen pt-10 flex items-center justify-center bg-blue-50 px-4">
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
                statusMessage.type === "success"
                  ? "text-green-600"
                  : "text-red-600"
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

            {/* Glowing Card Payment Options */}
            <div className="flex gap-4">
              {/* Offline Card */}
              <label
                className={`flex-1 cursor-pointer rounded-2xl p-5 flex flex-col items-center justify-center relative transition-all duration-300 transform hover:scale-105 ${
                  paymentMethod === "offline"
                    ? "bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-xl shadow-blue-300 border-2 border-blue-600"
                    : "bg-gray-50 border border-gray-300 text-gray-700"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="offline"
                  checked={paymentMethod === "offline"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="hidden"
                />
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-2xl mb-2">
                  💵
                </div>
                <span className="mt-1 text-lg font-semibold">Offline</span>
                <span className="text-xs opacity-80">Pay at clinic</span>
                {paymentMethod === "offline" && (
                  <span className="absolute top-2 right-2 text-white bg-blue-600 rounded-full px-2 py-1 text-xs">
                    Selected
                  </span>
                )}
              </label>

              {/* Online Card */}
              <label
                className={`flex-1 cursor-pointer rounded-2xl p-5 flex flex-col items-center justify-center relative transition-all duration-300 transform hover:scale-105 ${
                  paymentMethod === "online"
                    ? "bg-gradient-to-br from-green-500 to-green-700 text-white shadow-xl shadow-green-300 border-2 border-green-600"
                    : "bg-gray-50 border border-gray-300 text-gray-700"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="hidden"
                />
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-2xl mb-2">
                  💳
                </div>
                <span className="mt-1 text-lg font-semibold">Online</span>
                <span className="text-xs opacity-80">Pay via Stripe</span>
                {paymentMethod === "online" && (
                  <span className="absolute top-2 right-2 text-white bg-green-600 rounded-full px-2 py-1 text-xs">
                    Selected
                  </span>
                )}
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

