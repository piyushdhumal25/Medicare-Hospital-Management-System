const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  specialty: { type: String, required: true },
  experience: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },

  // 🔹 Add earnings field
  earnings: { type: Number, default: 0 }
});

module.exports = mongoose.model("Doctor", doctorSchema);