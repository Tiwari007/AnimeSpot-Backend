const express = require("express");
const cors = require("cors");
require('dotenv').config();
const connectDB = require("./config/database");

// Import routes and middleware
const apiRoutes = require("./routes/index");
const requestLogger = require("./middleware/requestLogger");
const errorHandler = require("./middleware/errorHandler");

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// API Routes
app.use("/api", apiRoutes);

// Legacy routes for backward compatibility
const getRoutes = require("./routes/getRoutes");
app.use("/anime", getRoutes);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found"
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Database: Anime4ume`);
  console.log(`🌐 API Endpoint: http://localhost:${PORT}/api`);
});