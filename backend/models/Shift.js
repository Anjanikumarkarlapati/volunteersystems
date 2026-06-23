const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  volunteerId: String,
  eventId: String,
  date: String,
  time: String
}, { timestamps: true });

module.exports = mongoose.model('Shift', shiftSchema);