const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

// Models
const Appointment = require("./models/Appointments");

console.log("🚀 Starting server...");
const app = express();

// ✅ CORS Setup - Add your Vercel frontend URL here
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev
      "https://medicare-hospital-management-system-oizd-egz09vb4w.vercel.app", // Vercel frontend
    ],
    credentials: true,
  })
);

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ✅ Root route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully! Use /api/... endpoints.");
});

// Test route to verify server is running
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    routes: {
      donors: "/api/donors",
      test: "/api/test",
    },
  });
});

// Debug route: List all registered endpoints
app.get("/api/routes", (req, res) => {
  const routes = [];
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      routes.push({
        path: middleware.route.path,
        methods: Object.keys(middleware.route.methods),
      });
    } else if (middleware.name === "router") {
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          routes.push({
            path: handler.route.path,
            methods: Object.keys(handler.route.methods),
          });
        }
      });
    }
  });
  res.json(routes);
});

// ✅ Connect to MongoDB
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/appointmentsDB";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// Routes
const authRoutes = require("./routes/Auth");
app.use("/api", authRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api", adminRoutes);

const doctorRoutes = require("./routes/DoctorRoutes");
app.use("/api", doctorRoutes);

const appointmentRoutes = require("./routes/AppointmentRoutes");
app.use("/api/appointments", appointmentRoutes);

const donorRoutes = require("./routes/donorRoutes");
app.use("/api/donors", donorRoutes);
console.log("✅ Donor routes mounted at /api/donors");

const PaymentRoutes = require("./routes/PaymentRoutes");
app.use("/api/payment", PaymentRoutes);

app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api", require("./routes/chatbotRoutes"));

// Debug middleware
app.use((req, res, next) => {
  console.log(`📝 ${req.method} ${req.path}`);
  next();
});

// 404 handler
app.use((req, res) => {
  if (!res.headersSent) {
    res.status(404).json({
      success: false,
      message: "Route not found",
    });
  }
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  if (!res.headersSent) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internal server error",
      error:
        process.env.NODE_ENV === "development"
          ? { message: err.message, stack: err.stack }
          : undefined,
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});