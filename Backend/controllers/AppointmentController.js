const Appointment = require("../models/Appointments");

exports.createAppointment = async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: "Failed to create appointment" });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
};

// Add or update prescription for an appointment
exports.addPrescription = async (req, res) => {
  try {
    console.log('Prescription request body:', req.body);
    const { appointmentId, prescription } = req.body;
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      console.log('Appointment not found for ID:', appointmentId);
      return res.status(404).json({ message: "Appointment not found" });
    }
    // Expect prescription to be an array of objects
    if (!Array.isArray(prescription)) {
      return res.status(400).json({ message: "Prescription must be an array" });
    }
    appointment.prescription = prescription;
    await appointment.save();
    console.log('Prescription saved for appointment:', appointmentId);
    res.status(200).json({ message: "Prescription added", appointment });
  } catch (error) {
    console.error('Error in addPrescription:', error);
    res.status(500).json({ message: "Failed to add prescription", error: error.message });
  }
};