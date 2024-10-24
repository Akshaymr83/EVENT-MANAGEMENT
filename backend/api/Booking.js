const express = require('express');
const Booking = require('../models/Admin/booking'); // Make sure the path and model are correct
const router = express.Router();

// Route to handle booking creation
router.post('/bookings', async (req, res) => {
  try {
    const { name, email, state, district, mobileNumber, bookingDate, numberOfPeople, event } = req.body;

    // Validate incoming data
    if (!name || !email || !state || !district || !mobileNumber || !bookingDate || !numberOfPeople || !event) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newBooking = new Booking({
      name,
      email,
      state,
      district,
      mobileNumber,
      bookingDate,
      numberOfPeople,
      event
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to create booking', error });
  }
});

// GET: Retrieve all bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('event');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ message: 'Failed to retrieve bookings', error });
  }
});
router.delete("/bookings/:id", async (req, res) => {
  try {
    const bookingId = req.params.id;
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
