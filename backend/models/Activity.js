const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  type: String,
  text: String,
  time: String
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);