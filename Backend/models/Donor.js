const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  occupation: { type: String, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  zip: { type: String, required: true },
  lastDonation: { type: Date },
  donatedPreviously: { type: String },
  medications: [String],
  surgeryHistory: [String],
}, { timestamps: true });

module.exports = mongoose.model("Donor", donorSchema);
