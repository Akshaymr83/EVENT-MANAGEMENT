// server.js
const express = require('express');
const bodyParser =require('body-parser')
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const authRoutes = require('./api/User');
const companyRoutes = require('./api/Company')
const adminRoutes = require('./api/Admin')

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

    app.use(bodyParser.json()); 
    

// Routes
app.use('/api/user', authRoutes);
app.use('/api/admin',adminRoutes)
// app.use('/api/company',companyRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
