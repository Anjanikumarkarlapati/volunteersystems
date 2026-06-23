const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');

router.get('/', async (req, res) => {
  const volunteers = await Volunteer.find();
  res.json(volunteers);
});

router.post('/', async (req, res) => {
  console.log("BODY:", req.body);

  const volunteer = await Volunteer.create(req.body);
  res.json(volunteer);
});

router.put('/:id', async (req, res) => {
  const volunteer = await Volunteer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(volunteer);
});

router.delete('/:id', async (req, res) => {
  await Volunteer.findByIdAndDelete(req.params.id);
  res.json({ message: 'Volunteer deleted' });
});

module.exports = router;