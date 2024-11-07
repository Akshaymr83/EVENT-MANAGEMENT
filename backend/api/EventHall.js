// const express = require('express');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const path = require('path');
// const EventHall = require('../models/Company/EventHall');

// const router = express.Router();

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

// // POST: Create a new Event Hall
// router.post('/eventhalls', upload.array('images', 5), async (req, res) => {
//   try {
//     const imagePaths = req.files.map(file => file.path);

//     const newEventHall = new EventHall({
//       name: req.body.name,
//       location: req.body.location,
//       description: req.body.description,
//       price: req.body.price,
//       images: imagePaths
//     });

//     await newEventHall.save();
//     res.status(201).json({ message: 'Event Hall created successfully', eventHall: newEventHall });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating event hall', error });
//   }
// });
// // Example of your event hall creation route

// // GET: Retrieve all Event Halls
// router.get('/eventhalls', async (req, res) => {
//   try {
//     const eventHalls = await EventHall.find();
//     res.status(200).json(eventHalls);
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving event halls', error });
//   }
// });

// // GET: Retrieve a single Event Hall by ID
// router.get('/eventhalls/:id', async (req, res) => {
//   try {
//     const eventHall = await EventHall.findById(req.params.id);
//     if (!eventHall) return res.status(404).json({ message: 'Event Hall not found' });
//     res.status(200).json(eventHall);
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving event hall', error });
//   }
// });

// // PUT: Update an Event Hall by ID
// router.put('/eventhalls/:id', upload.array('images', 5), async (req, res) => {
//   try {
//     const imagePaths = req.files.map(file => file.path);

//     const updatedData = {
//       name: req.body.name,
//       location: req.body.location,
//       description: req.body.description,
//       price: req.body.price,
//       images: imagePaths.length ? imagePaths : undefined // Only update images if new ones are provided
//     };

//     const updatedEventHall = await EventHall.findByIdAndUpdate(req.params.id, updatedData, { new: true });
//     if (!updatedEventHall) return res.status(404).json({ message: 'Event Hall not found' });

//     res.status(200).json({ message: 'Event Hall updated successfully', eventHall: updatedEventHall });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating event hall', error });
//   }
// });

// // DELETE: Delete an Event Hall by ID
// router.delete('/eventhalls/:id', async (req, res) => {
//   try {
//     const deletedEventHall = await EventHall.findByIdAndDelete(req.params.id);
//     if (!deletedEventHall) return res.status(404).json({ message: 'Event Hall not found' });

//     res.status(200).json({ message: 'Event Hall deleted successfully', eventHall: deletedEventHall });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting event hall', error });
//   }
// });

// module.exports = router;





const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const EventHall = require('../models/Company/EventHall'); // Adjust the path as necessary

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images'); // Destination folder for uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage: storage });

// Route to fetch event halls for a specific company
router.get('/eventhalls/:companyId', async (req, res) => {
  const companyId = req.params.companyId;

  // Validate the companyId
  if (!mongoose.Types.ObjectId.isValid(companyId)) {
    return res.status(400).json({ message: "Invalid company ID" });
  }

  try {
    // Fetch event halls associated with the company ID
    const eventHallBookings = await EventHall.find({ company: companyId });
    res.json(eventHallBookings);
  } catch (error) {
    console.error("Error fetching event hall bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST: Create a new Event Hall
router.post('/eventhalls', upload.array('images', 5), async (req, res) => {
  try {
    const { name, location, description, price, companyId } = req.body; // Get the companyId from the request body
    // const imagePaths = req.files.map(file => file.path); // Extract image paths
    const imagePaths = req.files ? req.files.map(file => file.path) : [];

    // Validate the companyId
  

    // Check if an event hall with the same name and location already exists for the given company
    const existingEventHall = await EventHall.findOne({
      name,
      location,
      companyId, // Ensure the event hall is associated with the company
    });

    if (existingEventHall) {
      return res.status(400).json({ message: 'Event Hall already exists at this location.' });
    }

    // Create a new event hall
    const newEventHall = new EventHall({
      name,
      location,
      description,
      price,
      images: imagePaths,
      company: companyId, // Link to the company ID
    });

    const savedEventHall = await newEventHall.save();
    res.status(201).json( savedEventHall);
  } catch (error) {
    console.error("Error creating event hall:", error);
    res.status(500).json({ message: 'Error creating event hall', error: error.message });
  }
});
// Example of your event hall creation route




// GET: Retrieve all Event Halls
// router.get('/eventhalls', async (req, res) => {
//   try {
//     const eventHalls = await EventHall.find();
//     res.status(200).json(eventHalls);
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving event halls', error });
//   }
// });

// GET: Retrieve a single Event Hall by ID
// router.get('/eventhalls/:id', async (req, res) => {
//   try {
//     const eventHall = await EventHall.findById(req.params.id);
//     if (!eventHall) return res.status(404).json({ message: 'Event Hall not found' });
//     res.status(200).json(eventHall);
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving event hall', error });
//   }
// });

// PUT: Update an Event Hall by ID
// PUT route for updating an event hall
router.put('/eventHalls/:id', upload.array('images'), async (req, res) => {
  try {
    const { name, location, description, price } = req.body;
    let images = req.files ? req.files.map(file => file.filename) : [];

    // Append existing images if they are passed in the body
    if (req.body.existingImages) {
      const existingImages = Array.isArray(req.body.existingImages) ? req.body.existingImages : [req.body.existingImages];
      images = images.concat(existingImages);
    }

    // Find the event hall by ID and update its fields
    const updatedEventHall = await EventHall.findByIdAndUpdate(
      req.params.id,
      { name, location, description, price, images },
      { new: true }
    );

    if (!updatedEventHall) {
      return res.status(404).json({ message: 'Event Hall not found' });
    }

    res.status(200).json(updatedEventHall);
  } catch (error) {
    console.error('Error updating event hall:', error);
    res.status(500).json({ message: 'Error updating event hall' });
  }
});

// DELETE: Delete an Event Hall by ID
router.delete('/eventhalls/:id', async (req, res) => {
  try {
    const deletedEventHall = await EventHall.findByIdAndDelete(req.params.id);
    if (!deletedEventHall) return res.status(404).json({ message: 'Event Hall not found' });

    res.status(200).json({ message: 'Event Hall deleted successfully', eventHall: deletedEventHall });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event hall', error });
  }
});

module.exports = router;
