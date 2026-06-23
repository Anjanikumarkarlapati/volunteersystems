const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

router.get('/', async (req, res) => {
  res.json(await Attendance.find());
});

router.put('/:id', async (req, res) => {
  res.json(await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

module.exports = router;