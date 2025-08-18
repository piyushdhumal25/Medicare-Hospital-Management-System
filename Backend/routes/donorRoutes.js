const express = require("express");
const router = express.Router();
const Donor = require("../models/Donor");

// Get all donors
router.get("/", async (req, res) => {
  try {
    const donors = await Donor.find().sort({ createdAt: -1 });
    res.status(200).json(donors);
  } catch (err) {
    console.error("Error fetching donors:", err);
    res.status(500).json({ error: "Failed to fetch donors" });
  }
});

// Create new donor
router.post("/create", async (req, res) => {
  try {
    const newDonor = new Donor(req.body);
    const savedDonor = await newDonor.save();
    console.log('Created new donor:', savedDonor);
    res.status(201).json(savedDonor);
  } catch (err) {
    console.error("Error creating donor:", err);
    res.status(500).json({ message: "Failed to create donor", error: err.message });
  }
});

// Delete a donor
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Donor.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Donor not found" });
    }

    res.status(200).json({ message: "Donor deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Failed to delete donor" });
  }
});

module.exports = router;
