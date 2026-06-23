const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  tier: String,
  status: String
}, { timestamps: true });

module.exports = mongoose.model('Volunteer', volunteerSchema);