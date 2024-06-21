const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const sessionMiddleware = require('./middleware/sessionMiddleware');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config(); // Load environment variables

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Session middleware
app.use(sessionMiddleware);

// Use the auth routes
app.use('/api', authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
