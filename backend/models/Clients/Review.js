const mongoose = require('mongoose');

// Define the schema for reviews
const reviewSchema = new mongoose.Schema({
  userName: { type: String, required: true }, // Name of the user submitting the review
  reviewText: { type: String, required: true }, // Content of the review
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create and export the model
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
