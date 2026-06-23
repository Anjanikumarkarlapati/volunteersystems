const mongoose = require('mongoose');

const communicationSchema = new mongoose.Schema({
  name: String,
  lastMessage: String,
  time: String,
  unread: Boolean
}, { timestamps: true });

module.exports = mongoose.model('Communication', communicationSchema);