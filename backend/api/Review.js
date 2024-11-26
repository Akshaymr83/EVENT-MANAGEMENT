const express = require('express');
const Review = require('../models/Clients/Review'); // Import the Review model
const router = express.Router();

// @route GET /api/review
// @desc Fetch all reviews
router.get('/review', async (req, res) => {
  try {
    const reviews = await Review.find(); // Fetch all reviews from the database
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// @route POST /api/review
// @desc Add a new review
router.post('/review', async (req, res) => {
    const { userName, reviewText } = req.body;
  
    if (!userName) {
      return res.status(400).json({ message: 'You must log in to add a review' });
    }
  
    try {
      const review = new Review({ userName, reviewText });
      await review.save();
      res.status(201).json(review);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add review', error });
    }
  });
  

// @route PUT /api/review/:id
// @desc Update an existing review
// Update Review
router.put('/review/:id', async (req, res) => {
    const { userName, reviewText } = req.body;
  
    try {
      // Find the review by ID
      const review = await Review.findById(req.params.id);
  
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
  
      // Check if the logged-in user is the owner of the review
      if (review.userName !== userName) {
        return res.status(403).json({ message: 'You are not authorized to edit this review' });
      }
  
      // Update the review text
      review.reviewText = reviewText || review.reviewText;
      await review.save();
  
      res.status(200).json({ message: 'Review updated successfully', review });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update review', error });
    }
  });
  
// @route DELETE /api/review/:id
// @desc Delete a review
router.delete('/review/:id', async (req, res) => {
    const { userName } = req.query;
  
    try {
      console.log('Delete request received:', req.params.id, userName);
  
      if (!userName) {
        console.error('UserName missing in request');
        return res.status(400).json({ message: 'UserName is required' });
      }
  
      const review = await Review.findById(req.params.id);
  
      if (!review) {
        console.error('Review not found:', req.params.id);
        return res.status(404).json({ message: 'Review not found' });
      }
  
      if (review.userName !== userName) {
        console.error('Authorization failed for user:', userName);
        return res.status(403).json({ message: 'You are not authorized to delete this review' });
      }
  
      // Use deleteOne instead of remove
      await Review.deleteOne({ _id: req.params.id });
  
      console.log('Review deleted successfully');
      res.status(200).json({ message: 'Review deleted successfully' });
  
    } catch (error) {
      console.error('Error deleting review:', error);
      res.status(500).json({ message: 'Failed to delete review', error });
    }
  });
  
  
module.exports = router;
