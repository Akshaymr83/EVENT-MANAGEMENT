// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const Company = require('../models/Company/Company'); // Import Company model

// const router = express.Router();

// // Company Signup Route
// router.post('/companySignup', async (req, res) => {
//     const { company_name, email, password } = req.body;

//     try {
//         // Check if the company email already exists
//         const existingCompany = await Company.findOne({ email });
//         if (existingCompany) {
//             return res.status(400).json({ message: 'Email is already registered' });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new company user
//         const newCompany = new Company({
//             company_name,
//             email,
//             password: hashedPassword,
//         });

//         // Save the new company to the database
//         await newCompany.save();

//         res.status(201).json({ message: 'Company registered successfully',success: true });
        
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// });

// // Company Login Route
// // Company Login Route
// router.post('/companyLogin', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Check if the company exists
//         const company = await Company.findOne({ email });
//         if (!company) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         // Check if the password matches
//         const isMatch = await bcrypt.compare(password, company.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         // Create a JWT token
//         const token = jwt.sign(
//             { id: company._id, email: company.email },
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' }
//         );

//         // Send the token and company ID in response
//         res.status(200).json({ 
//             message: 'Login successful', 
//             token, 
//             companyId: company._id,  // Include companyId here
//             success: true 
//         });
    
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// });

// module.exports = router;
// Import required packages and initialize router
const express = require("express");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const Company = require("../models/Company/Company"); // Company model
const CompanyOTPVerification = require("../models/Company/CompanyUserVerification"); // OTP model for company

// Configure nodemailer transporter
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    },
});

// Company Signup
router.post("/companySignup", async (req, res) => {
    let { company_name, email, password } = req.body;

    // Trim the input fields
    company_name = company_name.trim();
    email = email.trim();
    password = password.trim();

    // Validate inputs
    if (!company_name || !email || !password) {
        return res.json({
            status: "Failed",
            message: "Empty input field",
        });
    }

    if (!/^[a-zA-Z\s]+$/.test(company_name)) {
        return res.json({
            status: "Failed",
            message: "Invalid company name",
        });
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return res.json({
            status: "Failed",
            message: "Invalid email format",
        });
    }

    if (password.length < 8) {
        return res.json({
            status: "Failed",
            message: "Password is too short",
        });
    }

    try {
        // Check if company already exists
        const existingCompany = await Company.findOne({ email });
        if (existingCompany) {
            return res.json({
                status: "Failed",
                message: "Company with this email already exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new company
        const newCompany = new Company({
            company_name,
            email,
            password: hashedPassword,
            verified: false,
        });

        const savedCompany = await newCompany.save();
        sendOTPVerificationEmail(savedCompany, res);

    } catch (error) {
        console.error(error);
        res.json({
            status: "Failed",
            message: "An error occurred during signup",
        });
    }
});

// Company Login
router.post("/companyLogin", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            status: "Failed",
            message: "Empty input field",
        });
    }

    try {
        // Check if company exists
        const company = await Company.findOne({ email });
        if (!company) {
            return res.json({
                status: "Failed",
                message: "Company not found",
            });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, company.password);
        if (!isPasswordValid) {
            return res.json({
                status: "Failed",
                message: "Invalid password",
            });
        }

        // Successful login
        res.json({
            status: "Success",
            message: "Company logged in successfully",
            data: {
                companyId: company._id,
                company_name: company.company_name,
                email: company.email,
                verified: company.verified,
            },
        });
    } catch (error) {
        console.error(error);
        res.json({
            status: "Failed",
            message: "An error occurred during login",
        });
    }
});

// Send OTP Verification Email
const sendOTPVerificationEmail = async ({ _id, email }, res) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Verify Your Company Email",
            html: `<p>Enter <b>${otp}</b> in the app to verify your email address.</p>
                   <p><b>This code expires in 1 hour.</b></p>`
        };

        const hashedOTP = await bcrypt.hash(otp, 10);

        const newOTPVerification = new CompanyOTPVerification({
            companyId: _id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000, // 1 hour expiry
        });

        await newOTPVerification.save();
        await transporter.sendMail(mailOptions);

        res.json({
            status: "PENDING",
            message: "Verification OTP email sent",
            data: {
                companyId: _id,
                email,
            },
        });
    } catch (error) {
        console.error(error);
        res.json({
            status: "Failed",
            message: "An error occurred while sending OTP",
        });
    }
};

// Verify OTP
router.post("/verify-Companyotp", async (req, res) => {
    const { companyId, otp } = req.body;

    try {
        const otpRecord = await CompanyOTPVerification.findOne({ companyId });
        if (!otpRecord) {
            return res.json({
                status: "Failed",
                message: "OTP record not found",
            });
        }

        if (Date.now() > otpRecord.expiresAt) {
            return res.json({
                status: "Failed",
                message: "OTP has expired",
            });
        }

        const isValidOTP = await bcrypt.compare(otp, otpRecord.otp);
        if (!isValidOTP) {
            return res.json({
                status: "Failed",
                message: "Invalid OTP",
            });
        }

        await Company.updateOne({ _id: companyId }, { verified: true });
        await CompanyOTPVerification.deleteOne({ companyId });

        res.json({
            status: "Success",
            message: "Company verified successfully",
        });
    } catch (error) {
        console.error(error);
        res.json({
            status: "Failed",
            message: "An error occurred during OTP verification",
        });
    }
});

module.exports = router;
