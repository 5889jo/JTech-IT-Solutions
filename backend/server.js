// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes'); // Import your student routes

const app = express();
const PORT = process.env.PORT || 3000; // Allow dynamic port for production environments

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(bodyParser.json()); // Parse incoming requests with JSON payloads

// Set up the routes to handle API requests for student data
app.use('/api', studentRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/studentdb', {
  useNewUrlParser: true, // Ensure the parser is using the new URL format
  useUnifiedTopology: true // Use the new connection management
})
  .then(() => {
    console.log('Successfully connected to MongoDB');
    
    // Start the server only if the database connection is successful
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    // Log any errors that occur during MongoDB connection
    console.error('MongoDB connection error:', err);
  });
