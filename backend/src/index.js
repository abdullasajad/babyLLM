require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const httpErrors = require('http-errors');
// Using express built-in body parsing
const connectDB = require('./config/database');
const { errorHandler } = require('./middleware/errorHandler');
const searchRoutes = require('./routes/search');
const authRoutes = require('./routes/auth');
const summaryRoutes = require('./routes/summary');

// Initialize Express app
const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Connect to Database
connectDB();

// API Routes
app.use('/api/search', searchRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/summary', summaryRoutes);

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 Handler
app.use((req, res, next) => {
  next(httpErrors.NotFound('API endpoint not found'));
});

// Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = app;
