const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load environment variables
dotenv.config();

// Import routes
const prospectRoutes = require('./routes/prospects');

// Import middleware
// Create middleware directory if it doesn't exist
const middlewarePath = path.join(__dirname, 'middleware');
if (!fs.existsSync(middlewarePath)) {
  fs.mkdirSync(middlewarePath);
}

// Create Express app
const app = express();

// Middleware
app.use(cors({
  origin: [
    'https://hubkom-crm-frontend.vercel.app', // Replace with your actual Vercel URL
    'http://localhost:3000' // Keep this for local development
  ],
  credentials: true
}));
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/simple-crm';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

// Public route
app.get('/', (req, res) => {
  res.send('Simple CRM API is running!');
});

// API routes with conditional auth middleware
if (process.env.AUTH0_ENABLED === 'true') {
  // Use authentication when enabled
  try {
    const checkJwt = require('./middleware/auth');
    app.use('/api/prospects', checkJwt, prospectRoutes);
    console.log('Authentication middleware enabled');
  } catch (error) {
    console.error('Error loading auth middleware:', error);
    app.use('/api/prospects', prospectRoutes);
  }
} else {
  // Skip authentication for development
  app.use('/api/prospects', prospectRoutes);
  console.log('Authentication middleware disabled');
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Handle auth errors
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Invalid token or not authenticated' });
  }
  
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; 