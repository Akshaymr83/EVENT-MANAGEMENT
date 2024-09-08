// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const CompanyUserSchema = new Schema({
company_name :String ,
email:String,
password:String,

});

const Company = mongoose.model('Company', CompanyUserSchema);
module.exports = Company;
