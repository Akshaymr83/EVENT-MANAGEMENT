const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const authRoutes = require('./api/User');
const companyRoutes = require('./api/Company');
const adminRoutes = require('./api/Admin');
const bookingRoutes = require('./api/Booking');
const packagesRoutes = require('./api/packages')
const eventHallRoutes = require('./api/EventHall')
const reviewRoutes = require('./api/Review')
const path = require('path')

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
}));

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/user', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/event', bookingRoutes); // Ensure booking routes are registered
app.use('/api/packages',packagesRoutes)
app.use('/api/company',companyRoutes)
app.use('/api/eventHall',eventHallRoutes)
app.use('/api/review', reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
