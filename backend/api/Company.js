const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Company = require('../models/Company/Company'); // Import Company model

const router = express.Router();

// Company Signup Route
router.post('/companySignup', async (req, res) => {
    const { company_name, email, password } = req.body;

    try {
        // Check if the company email already exists
        const existingCompany = await Company.findOne({ email });
        if (existingCompany) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new company user
        const newCompany = new Company({
            company_name,
            email,
            password: hashedPassword,
        });

        // Save the new company to the database
        await newCompany.save();

        res.status(201).json({ message: 'Company registered successfully',success: true });
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Company Login Route
router.post('/companyLogin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the company exists
        const company = await Company.findOne({ email });
        if (!company) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, company.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create a JWT token
        const token = jwt.sign(
            { id: company._id, email: company.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send the token in response
        res.status(200).json({ message: 'Login successful', token, success: true });
    
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
