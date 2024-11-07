// backend/models/CompanyOTPVerification.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanyOTPVerificationSchema = new Schema({
    companyId: String,         // Reference to the company ID
    otp: String,               // OTP code
    createdAt: Date,           // Timestamp when OTP was created
    expiresAt: Date,           // Expiry timestamp for the OTP
});

const CompanyOTPVerification = mongoose.model(
    "CompanyOTPVerification",
    CompanyOTPVerificationSchema
);

module.exports = CompanyOTPVerification;
