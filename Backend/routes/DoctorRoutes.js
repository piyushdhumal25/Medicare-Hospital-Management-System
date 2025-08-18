const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { getDoctors, addDoctor, doctorLogin } = require("../controllers/doctorController");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ GET: All Verified Doctors
router.get("/doctors", async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor"});

    // Merge doctorInfo into one object for frontend
    const formatted = doctors.map(doc => ({
      id: doc._id,
      name: doc.username,
      email: doc.email,
      ...doc.doctorInfo,
      reviews: doc.reviews || []
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
});

// doctorRoutes.js


// Doctor Login Route (DB check)
router.post("/doctor/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await User.findOne({ email, role: "doctor" });

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: doctor._id, role: "doctor" }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({
      message: "Login successful",
      token,
      doctor: {
        id: doctor._id,
        name: doctor.username,
        email: doctor.email
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
router.get("/doctors",getDoctors);


router.get("/doctors",addDoctor);

module.exports = router;