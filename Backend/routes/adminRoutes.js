const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const verifyToken = require("../middleware/AuthMiddleware");
const checkRole = require("../middleware/roleMiddleware");

const router = express.Router();

// ✅ POST: Add Doctor (Admin only)
router.post("/admin/add-doctor", verifyToken, checkRole("admin"), async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      specialty,
      experience,
      fee,
      rating,
      category,
      available,
      availability,
      education,
      certificate
    } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Doctor already exists with this email." });
    }

    const hashedPassword = await bcrypt.hash(password || "123456", 10);

    const newDoctor = new User({
      username: name,
      email,
      password: hashedPassword,
      role: "doctor",
      isVerified: false,
      doctorInfo: {
        specialty,
        experience,
        fee,
        rating,
        category,
        available,
        availability,
        education,
        certificate
      }
    });

    await newDoctor.save();
    res.status(201).json({ message: "Doctor added successfully", doctor: newDoctor });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while adding doctor." });
  }
});

router.patch("/admin/verify-doctor/:id", async (req, res) => {
  try {
    const doctor = await User.findByIdAndUpdate(
      req.params.id,
      { isVerified: true },
      { new: true }
    );

    res.status(200).json({ msg: "Doctor verified", doctor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to verify doctor" });
  }
});

module.exports = router;
