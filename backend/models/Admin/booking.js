// models/Booking.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  numberOfPeople: {
    type: Number,
    required: true,
    min: 1,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', // Reference to the event model
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;


// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   state: { type: String },
//   district: { type: String },
//   mobileNumber: { type: String },
//   bookingDate: { type: Date, required: true },
//   numberOfPeople: { type: Number },
//   event: { type: String },
//   userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // Ensure 'User' is the correct reference
// });

// const Booking = mongoose.model('Booking', bookingSchema);
// module.exports = Booking;
