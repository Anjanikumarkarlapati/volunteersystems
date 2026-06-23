const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  desc: String,
  date: String,
  category: String,
  capacity: Number,
  registered: Number,
  status: String
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);