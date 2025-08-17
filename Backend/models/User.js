const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "doctor", "patient"],
    default: "patient"
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  doctorInfo: {
    specialty: String,
    experience: String,
    fee: String,
    rating: String,
    category: String,
    available: [String],
    availability: String,
    education: String,
    certificate: String
  }
});

module.exports = mongoose.model("User", UserSchema);
