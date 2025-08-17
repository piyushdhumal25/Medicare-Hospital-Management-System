const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  patientEmail: { type: String, required: true },
  doctorName: { type: String, required: true },
  doctorEmail: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  reason: String,
  status: { type: String, default: "Pending" }, // Appointment status
  paymentStatus: { type: String, default: "Unpaid" }, // Unpaid | Pending | Paid
});

// prevent duplicate booking
AppointmentSchema.index(
  { patientEmail: 1, doctorEmail: 1, date: 1, time: 1 },
  { unique: true }
);

module.exports = mongoose.model("Appointment", AppointmentSchema);