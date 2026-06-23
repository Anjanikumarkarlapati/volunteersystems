const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  volunteerId: String,
  eventId: String,
  scheduled: String,
  checkedIn: String,
  status: String
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);