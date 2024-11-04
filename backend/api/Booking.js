// const express = require('express');
// const Booking = require('../models/Admin/booking'); // Make sure the path and model are correct
// const router = express.Router();

// // Route to handle booking creation
// router.post('/bookings', async (req, res) => {
//   try {
//     const { name, email, state, district, mobileNumber, bookingDate, numberOfPeople, event } = req.body;

//     // Validate incoming data
//     if (!name || !email || !state || !district || !mobileNumber || !bookingDate || !numberOfPeople || !event) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const newBooking = new Booking({
//       name,
//       email,
//       state,
//       district,
//       mobileNumber,
//       bookingDate,
//       numberOfPeople,
//       event
//     });

//     await newBooking.save();
//     res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: 'Failed to create booking', error });
//   }
// });

// // GET: Retrieve all bookings
// router.get('/bookings', async (req, res) => {
//   try {
//     const bookings = await Booking.find().populate('event');
//     res.status(200).json(bookings);
//   } catch (error) {
//     res.status(400).json({ message: 'Failed to retrieve bookings', error });
//   }
// });


// router.delete("/bookings/:id", async (req, res) => {
//   try {
//     const bookingId = req.params.id;
//     const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    
//     if (!deletedBooking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     res.status(200).json({ message: "Booking deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting booking:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;



const express = require('express');
const Booking = require('../models/Admin/booking'); // Make sure the path and model are correct
const router = express.Router();
const mongoose = require('mongoose'); 

// Route to handle booking creation
router.get('/bookings/:userId', async (req, res) => {
  const userId = req.params.userId;

  // Check if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const bookings = await Booking.find({ user: userId });
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// POST a new booking





router.post('/bookings', async (req, res) => {
 
  try {
    // const { userId, event, bookingDate, numberOfPeople } = req.body;
    const { name, email, state, district, mobileNumber, bookingDate, numberOfPeople, event, userId } = req.body;

    // Check if a booking already exists for the user on the same event and date
    const existingBooking = await Booking.findOne({
      userId,
      event,
      bookingDate,
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Booking already exists for this event on the selected date.' });
    }

    const newBooking = new Booking({
          name,
          email,
          state,
          district,
          mobileNumber,
          bookingDate,
          numberOfPeople,
          event,
          user: userId, // Use userId as user
        });
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
});

// Export the router




// router.post('/bookings', async (req, res) => {
//   const { name, email, state, district, mobileNumber, bookingDate, numberOfPeople, event, userId } = req.body; // Include userId in the request

//   const newBooking = new Booking({
//     name,
//     email,
//     state,
//     district,
//     mobileNumber,
//     bookingDate,
//     numberOfPeople,
//     event,
//     user: userId, // Use userId as user
//   });

//   console.log(newBooking)

//   try {
//     const savedBooking = await newBooking.save(); // Attempt to save the booking
//     res.status(201).json(savedBooking); // Respond with the saved booking
//   } catch (error) {
//     // Log the error to the console
//     console.error("Error creating booking:", error.message); // Log the error message for debugging
//     console.error(error.stack); // Log the full stack trace for more details

//     // Send a response back to the client with the error message
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// });




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



