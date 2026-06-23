const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
  title: String,
  desc: String,
  duration: String,
  category: String
}, { timestamps: true });

module.exports = mongoose.model('Training', trainingSchema);