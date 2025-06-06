require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');  // Correct import path

const app = express();

// Middleware
app.use(express.json());

// Database connection
connectDB();  // Now this will work

// Routes would go here...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));