// routes/admin.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Admin/event');

// Add a new event
router.post('/events', async (req, res) => {
    const { name, category, description } = req.body;

    try {
        const newEvent = new Event({ name, category, description });
        await newEvent.save();
        res.status(201).json(newEvent); // Send back the created event
    } catch (error) {
        console.error("Error saving event:", error);
        res.status(400).json({ message: 'Error saving event', error });
    }
});

// Get all events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an event
router.put('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an event
router.delete('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
