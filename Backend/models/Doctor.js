const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  specialty: { type: String, required: true },
  experience: { type: String, required: true },
  fees: { type: Number, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true }
});

module.exports = mongoose.model("Doctor", doctorSchema);