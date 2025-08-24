const express = require("express");

const { registerUser, loginUser, verifyToken, getAllPatients } = require("../controllers/AuthController");
const verifyTokenMiddleware = require("../middleware/AuthMiddleware");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed, role });
    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ Persistent login check (frontend will call this on page load)
router.get("/verify", verifyToken);

// ✅ Protected profile route using middleware
router.get("/profile", verifyTokenMiddleware, async (req, res) => {
  res.status(200).json({
    msg: "Welcome to your profile!",
    user: req.user, // from JWT decoded payload
  });
});

// ✅ Get all patients
router.get("/patients", getAllPatients);

module.exports = router;
