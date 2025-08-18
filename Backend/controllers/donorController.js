const Donor = require("../models/Donor");

const createDonor = async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    
    res.status(201).json({ 
      success: true,
      message: "Donation form submitted successfully!",
      donor: {
        name: `${donor.firstName} ${donor.lastName}`,
        email: donor.email
      }
    });

  } catch (error) {
    console.error('❌ Error creating donor:', error);
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors)
        .map(err => err.message)
        .join(', ');
      
      return res.status(400).json({
        success: false,
        message: `Please check your input: ${errorMessages}`
      });
    }
    
    // Handle duplicate key errors (e.g., duplicate email)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'This email is already registered. Please use a different email address.'
      });
    }
    
    // Handle all other errors
    res.status(500).json({ 
      success: false, 
      message: "We couldn't process your donation at this time. Please try again later.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const getDonors = async (req, res) => {
  try {
    console.log('Fetching donors...');
    const donors = await Donor.find().sort({ createdAt: -1 });
    console.log(`Found ${donors.length} donors`);
    
    return res.status(200).json({
      success: true,
      donors: donors
    });
  } catch (error) {
    console.error('Error fetching donors:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch donors',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Delete a single donor
const deleteDonor = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('🔍 Looking up donor:', id);

    const donor = await Donor.findById(id);
    if (!donor) {
      console.log('❌ Donor not found:', id);
      return res.status(404).json({
        success: false,
        message: "Donor not found"
      });
    }

    console.log('Found donor:', donor);
    await Donor.deleteOne({ _id: id });
    console.log('✅ Successfully deleted donor:', id);

    return res.status(200).json({
      success: true,
      message: "Donor deleted successfully"
    });
  } catch (error) {
    console.error('❌ Error deleting donor:', error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete donor: " + error.message
    });
  }
};

module.exports = { createDonor, getDonors, deleteDonor };
