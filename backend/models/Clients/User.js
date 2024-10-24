
// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const userSchema = new Schema({
name :String ,
email:String,
password:String,
dateOfBirth:Date,
verified:Boolean,
isAdmin: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);
module.exports =User;
// models/User.js
