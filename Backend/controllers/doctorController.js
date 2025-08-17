// Doctor Login
const doctorLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const doctor = await require("../models/User").findOne({ email, role: "doctor" });
    if (!doctor) {
      return res.status(401).json({ error: "Doctor not found." });
    }
    if (doctor.password !== password) {
      return res.status(401).json({ error: "Incorrect password." });
    }
    // You can add JWT token logic here for production
    res.json({ message: "Login successful", doctor: { id: doctor._id, name: doctor.username, email: doctor.email } });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};
const Doctor = require("../models/Doctor");

// Get all doctors
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
};

// Add new doctor (Admin)
const addDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json({ message: "Doctor added successfully", doctor });
  } catch (err) {
    res.status(500).json({ error: "Failed to add doctor" });
  }
};

module.exports = { getDoctors, addDoctor, doctorLogin };