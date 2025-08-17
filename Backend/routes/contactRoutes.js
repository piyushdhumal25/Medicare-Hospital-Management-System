// routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const { sendMessage, getAllMessages } = require("../controllers/contactController");

router.post("/", sendMessage);
router.get("/", getAllMessages); // ✅ new route for admin

module.exports = router;
