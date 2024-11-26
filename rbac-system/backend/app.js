const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
require('dotenv').config(); // Load the .env file into `process.env`

const mongoURI = process.env.MONGO_URI;
const app = express();

// Use CORS with specific configurations
app.use(
  cors({
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, headers, etc.)
  })
);

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));
console.log('Mongo URI:', process.env.MONGO_URI); // Debug MongoDB URI

app.use(express.json()); // Parse JSON request bodies

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
