const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointments"); // Make sure model file name is correct

// ✅ Create new appointment (Prevent duplicates)
router.post("/create", async (req, res) => {
  try {
    const { patientEmail, doctorEmail, date, time } = req.body;

    // Check if this exact slot is already booked for this patient & doctor
    const existing = await Appointment.findOne({
      patientEmail,
      doctorEmail ,
      date: date,
      time: time
    });

    if (existing) {
      return res.status(400).json({ error: "This slot is already booked" });
    }

    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    console.error("Create appointment error:", err);
    res.status(500).json({ error: "Failed to book appointment" });
  }
});

// ✅ Get all appointments (Admin)
router.get("/all", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1, time: 1 });
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

// ✅ Get appointments for patient by patientEmail
router.get("/", async (req, res) => {
  const { email } = req.query;
  console.log("Fetching appointments for patient email:", email);

  try {
    const appointments = await Appointment.find({ patientEmail: email }).sort({ date: 1, time: 1 });
    console.log("Found appointments:", appointments);
    res.status(200).json(appointments);
  } catch (err) {
    console.log("Error fetching appointments:", err);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

// ✅ Get appointments for doctor by doctorEmail
router.get("/doctor", async (req, res) => {
  const { email } = req.query;
  console.log("Fetching appointments for doctor email:", email);

  try {
    const appointments = await Appointment.find({ doctorEmail: email }).sort({ date: 1, time: 1 });
    console.log("Doctor's appointments:", appointments);
    res.status(200).json(appointments);
  } catch (err) {
    console.log("Error fetching doctor's appointments:", err);
    res.status(500).json({ error: "Failed to fetch doctor's appointments" });
  }
});

// ✅ Update appointment status
router.put("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
});

// ✅ DELETE single appointment by _id
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Appointment.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Failed to delete appointment" });
  }
});

module.exports = router;