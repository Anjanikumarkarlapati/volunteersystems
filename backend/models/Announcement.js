const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  subject: String,
  message: String,
  author: String,
  target: String,
  date: String
}, { timestamps: true });

module.exports = mongoose.model('Announcement', announcementSchema);