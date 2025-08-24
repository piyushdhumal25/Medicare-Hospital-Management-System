const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const connectDB = require("./config/db");
const Appointment = require("./models/Appointments");

console.log('Starting server...');
const app = express();

app.use(cors());

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Test route to verify server is running
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    routes: {
      donors: '/api/donors',
      test: '/api/test'
    }
  });
});

// Debug route: List all registered endpoints
app.get('/api/routes', (req, res) => {
  const routes = [];
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // routes registered directly on the app
      routes.push({
        path: middleware.route.path,
        methods: Object.keys(middleware.route.methods)
      });
    } else if (middleware.name === 'router') {
      // router middleware
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          routes.push({
            path: handler.route.path,
            methods: Object.keys(handler.route.methods)
          });
        }
      });
    }
  });
  res.json(routes);
});

// Connect to MongoDB once
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/appointmentsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);
});

const authRoutes = require("./routes/Auth");
app.use("/api", authRoutes);

const adminRoutes = require("./routes/adminRoutes"); // ✅ this must match filename
app.use("/api", adminRoutes); // ✅ must be this line

const doctorRoutes = require("./routes/DoctorRoutes");
app.use("/api", doctorRoutes);
 
const appointmentRoutes = require("./routes/AppointmentRoutes");
app.use("/api/appointments", appointmentRoutes);

// Debug middleware
app.use((req, res, next) => {
  console.log(`📝 ${req.method} ${req.path}`);
  next();
});

// Donor routes
const donorRoutes = require('./routes/donorRoutes');
app.use("/api/donors", donorRoutes);
console.log('✅ Donor routes mounted at /api/donors');

// Payment routes
const PaymentRoutes = require("./routes/PaymentRoutes");
app.use("/api/payment", PaymentRoutes);


// Additional Routes
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api", require("./routes/chatbotRoutes"));

// 404 handler
app.use((req, res) => {
  if (!res.headersSent) {
    res.status(404).json({
      success: false,
      message: 'Route not found'
    });
  }
});

// Global error handling middleware - only one instance needed
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  
  // Only send response if one hasn't been sent already
  if (!res.headersSent) {
    // Don't send error details in production
    const error = process.env.NODE_ENV === 'development' ? err : {};
    
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? {
        message: error.message,
        stack: error.stack
      } : undefined
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

