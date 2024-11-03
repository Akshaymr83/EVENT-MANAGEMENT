const express = require('express');
const router = express.Router();
const EventPackage = require('../models/Admin/packages');

// POST: Add a new event package
router.post('/packages', async (req, res) => {
  try {
    const { name, description, features, price } = req.body;
    const newPackage = new EventPackage({
      name,
      description,
      features,
      price
    });
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET: Retrieve all event packages
router.get('/packages', async (req, res) => {
  try {
    const packages = await EventPackage.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT: Update an existing event package
router.put('/packages/:id', async (req, res) => {
    try {
      const { name, description, features, price } = req.body;
      const updatedPackage = await EventPackage.findByIdAndUpdate(
        req.params.id,
        { name, description, features, price },
        { new: true, runValidators: true } // Returns the updated document
      );
      
      if (!updatedPackage) {
        return res.status(404).json({ error: 'Package not found' });
      }
      
      res.json(updatedPackage);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // DELETE: Delete an event package
  router.delete('/packages/:id', async (req, res) => {
    try {
      const deletedPackage = await EventPackage.findByIdAndDelete(req.params.id);
      
      if (!deletedPackage) {
        return res.status(404).json({ error: 'Package not found' });
      }
      
      res.json({ message: 'Package deleted successfully', deletedPackage });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports = router;
