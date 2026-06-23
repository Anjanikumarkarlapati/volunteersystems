const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  tier: String,
  status: String,
  date: String
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);