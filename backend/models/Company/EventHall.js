const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventHallSchema = new Schema({
  name: String,
  location: String,
  description: String,
  price: Number,
  images: [String], // Array to store multiple image URLs or paths
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company', // Reference to the Company model
    required: true,
  },
});

const EventHall = mongoose.model('EventHall', EventHallSchema);
module.exports = EventHall;
