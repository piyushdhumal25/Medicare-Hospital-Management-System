const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const Appointment = require("./models/Appointments");
const donorRoutes = require("./routes/donorRoutes");



const app = express();
connectDB;
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/Auth");
app.use("/api", authRoutes);

const adminRoutes = require("./routes/adminRoutes"); // ✅ this must match filename
app.use("/api", adminRoutes); // ✅ must be this line

const doctorRoutes = require("./routes/DoctorRoutes");
app.use("/api", doctorRoutes);
 
const appointmentRoutes = require("./routes/AppointmentRoutes");
app.use("/api/appointments", appointmentRoutes);
app.use("/api/Appointment", Appointment);
app.use("/api/donors", donorRoutes);


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));


// Routes
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api", require("./routes/chatbotRoutes"));


app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});