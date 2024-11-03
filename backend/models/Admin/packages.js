const mongoose = require('mongoose');

const eventPackageSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., Essential, Deluxe, Grand
  description: { type: String, required: true },
  features: [{ type: String, required: true }], // Array of feature strings
  price: { type: Number, required: true } // e.g., 79.99
});

module.exports = mongoose.model('EventPackage', eventPackageSchema);
