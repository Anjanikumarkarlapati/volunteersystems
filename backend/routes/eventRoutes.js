const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.get('/', async (req, res) => {
  res.json(await Event.find());
});

router.post('/', async (req, res) => {
  res.json(await Event.create(req.body));
});

router.put('/:id', async (req, res) => {
  res.json(await Event.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

router.delete('/:id', async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: 'Event deleted' });
});

router.post('/register/:id', async (req, res) => {
  const event = await Event.findById(req.params.id);
  event.registered += 1;
  await event.save();
  res.json(event);
});

module.exports = router;