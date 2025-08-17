const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  patientName: String,
  patientEmail: String,
  doctorName: String,
  doctorEmail: String,
  email: String,
  date: String,
  time: String,
  reason: String,
  status: String,
});

module.exports = mongoose.model("Appointment", AppointmentSchema);