const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const doctorsData = require("../final year/src/data/doctorsData.js");

const MONGO_URI = "mongodb://127.0.0.1:27017/appointmentsDB";

async function seedDoctors() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const doctorDocs = await Promise.all(doctorsData.map(async (doc) => {
    const hashedPassword = await bcrypt.hash(doc.password, 10);
    return {
      username: doc.name,
      email: doc.email,
      password: hashedPassword,
      role: "doctor",
      doctorInfo: {
        specialty: doc.specialty,
        experience: doc.experience,
        fee: doc.fee,
        rating: doc.rating,
        category: doc.category,
        available: doc.available,
        availability: doc.availability,
        education: doc.education,
        certificate: doc.certificate
      },
      reviews: doc.reviews || []
    };
  }));

  await User.deleteMany({ role: "doctor" });
  await User.insertMany(doctorDocs);
  console.log("Doctors seeded successfully.");
  mongoose.disconnect();
}

seedDoctors().catch(console.error);