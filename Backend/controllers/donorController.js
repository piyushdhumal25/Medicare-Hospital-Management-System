const Donor = require("../models/Donor");

const createDonor = async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.json({ success: true, message: "Donor saved successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getDonors = async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createDonor, getDonors };
