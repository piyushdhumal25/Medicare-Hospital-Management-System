const express = require("express");
const router = express.Router();
const { registerUser, loginUser, verifyToken, getAllPatients } = require("../controllers/AuthController");
const verifyTokenMiddleware = require("../middleware/AuthMiddleware");

// ✅ Register & Login routes
router.post("/register", registerUser);
router.post("/login", loginUser);

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
