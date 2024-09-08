const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const User = require("../models/Clients/User");
const UserOTPVerification = require("../models/Clients/UserOTPVerification");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, // or 465 for SSL
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    },
});



router.post("/signup", (req, res) => {
    let { name, email, password, dateOfBirth } = req.body;

    // Trim the input fields
    name = name.trim();
    email = email.trim();
    password = password.trim();
    dateOfBirth = dateOfBirth.trim();

    // Check if any input fields are empty
    if (name === "" || email === "" || password === "" || dateOfBirth === "") {
        return res.json({
            status: "Failed",
            message: "Empty input field",
        });
    }

    // Validate name (only letters allowed)
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        return res.json({
            status: "Failed",
            message: "Invalid name entered",
        });
    }

    // Validate email
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return res.json({
            status: "Failed",
            message: "Invalid email format",
        });
    }

    // Validate date of birth
    if (!new Date(dateOfBirth).getTime()) {
        return res.json({
            status: "Failed",
            message: "Invalid date of birth entered",
        });
    }

    // Validate password length
    if (password.length < 8) {
        return res.json({
            status: "Failed",
            message: "Password is too short",
        });
    }

    // If all validations pass, check if the user already exists
    User.findOne({ email })
        .then((user) => {
            if (user) {
                return res.json({
                    status: "Failed",
                    message: "User with this email already exists",
                });
            } else {
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds)
                    .then((hashedPassword) => {
                        const newUser = new User({
                            name,
                            email,
                            password: hashedPassword,
                            dateOfBirth,
                            verified: false,
                        });

                        newUser.save()
                            .then((result) => {
                                sendOTPVerificationEmail(result, res);
                            })
                            .catch((err) => {
                                console.error(err);
                                return res.json({
                                    status: "Failed",
                                    message: "An error occurred while saving the user",
                                });
                            });
                    })
                    .catch((err) => {
                        console.error(err);
                        return res.json({
                            status: "Failed",
                            message: "An error occurred while hashing the password",
                        });
                    });
            }
        })
        .catch((err) => {
            console.error(err);
            return res.json({
                status: "Failed",
                message: "An error occurred while checking for existing users",
            });
        });
});

// OTP email sending function
const sendOTPVerificationEmail = async ({ _id, email }, res) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;  // Generates a 4-digit OTP
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Verify Your Email",
            html: `<p>Enter <b>${otp}</b> in the app to verify your email address.</p>
                   <p><b>This code expires in 1 hour.</b></p>`
        };

        // Hash the OTP
        const saltRounds = 10;
        const hashedOTP = await bcrypt.hash(otp, saltRounds);

        // Create and store the OTP verification record
        const newOTPVerification = new UserOTPVerification({
            userId: _id,
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
                userId: _id,
                email,
            },
        });
    } catch (error) {
        console.error(error);
        res.json({
            status: "Failed",
            message: error.message,
        });
    }
};

router.post("/verify-otp", async (req, res) => {
    const { userId, otp } = req.body;

    try {
        const otpRecord = await UserOTPVerification.findOne({ userId });
        if (!otpRecord) {
            return res.json({
                status: "Failed",
                message: "OTP record not found",
            });
        }

        // Check if OTP has expired
        if (Date.now() > otpRecord.expiresAt) {
            return res.json({
                status: "Failed",
                message: "OTP has expired",
            });
        }

        // Verify the OTP
        const isValidOTP = await bcrypt.compare(otp, otpRecord.otp);
        if (!isValidOTP) {
            return res.json({
                status: "Failed",
                message: "Invalid OTP",
            });
        }

        // OTP is valid; proceed with user verification
        await User.updateOne({ _id: userId }, { verified: true });
        await UserOTPVerification.deleteOne({ userId });

        res.json({
            status: "Success",
            message: "User verified successfully",
        });
    } catch (error) {
        res.json({
            status: "Failed",
            message: error.message,
        });
    }
});


module.exports = router;
