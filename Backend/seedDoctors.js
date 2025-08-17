const mongoose = require("mongoose");
const dotenv = require("dotenv");
const doctorsData = require("./data/doctorsData");
const Doctor = require("./models/Doctor");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected...");

    await Doctor.insertMany(doctorsData);
    console.log("Doctors inserted successfully");

    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });