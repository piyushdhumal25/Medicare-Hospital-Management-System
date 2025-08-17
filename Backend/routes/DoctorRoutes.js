const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { getDoctors, addDoctor, doctorLogin } = require("../controllers/doctorController");
// Doctor Login Route
router.post("/doctor/login", doctorLogin);

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

router.get("/doctors",getDoctors);


router.get("/doctors",addDoctor);

module.exports = router;