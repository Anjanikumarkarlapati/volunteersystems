const express = require('express');
const router = express.Router();
const Shift = require('../models/Shift');
const Attendance = require('../models/Attendance');

router.get('/', async (req, res) => {
  res.json(await Shift.find());
});

router.post('/', async (req, res) => {
  try {
    const shift = await Shift.create(req.body);

    await Attendance.create({
      volunteerId: req.body.volunteerId,
      eventId: req.body.eventId,
      scheduled: `${req.body.date} ${req.body.time}`,
      checkedIn: '',
      status: 'pending'
    });

    res.json(shift);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating shift' });
  }
});

router.delete('/:id', async (req, res) => {
  await Shift.findByIdAndDelete(req.params.id);
  res.json({ message: 'Shift deleted' });
});

module.exports = router;
