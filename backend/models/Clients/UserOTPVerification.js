// backend/models/UserOTPVerification.js

const mongoose = require("mongoose");  // Import mongoose
const Schema = mongoose.Schema;  // Import Schema

const UserOTPVerificationSchema = new Schema({
    userId: String,
    otp: String,
    createdAt: Date,
    expiresAt: Date,
});

const UserOTPVerification = mongoose.model(
    "UserOTPVerification",  // Fixed typo: from 'modek' to 'model'
    UserOTPVerificationSchema
);

module.exports = UserOTPVerification;
