import React, { useEffect } from "react";
import axios from "axios";

const PaymentSuccess = () => {
  useEffect(() => {
    const confirmAppointment = async () => {
      const appointmentData = JSON.parse(localStorage.getItem("pendingAppointment"));

      if (appointmentData) {
        try {
          await axios.post("http://localhost:5000/api/payment/confirm-online-appointment", appointmentData);
          alert("✅ Appointment booked successfully (Online Payment)");
          localStorage.removeItem("pendingAppointment");
        } catch (error) {
          console.error(error);
          alert("Error saving appointment after payment");
        }
      }
    };
    confirmAppointment();
  }, []);

  return <h2>Payment Successful! Your appointment is confirmed.</h2>;
};

export default PaymentSuccess;