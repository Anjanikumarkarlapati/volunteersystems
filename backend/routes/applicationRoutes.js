const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

router.get('/', async (req, res) => {
  res.json(await Application.find());
});

router.put('/approve/:id', async (req, res) => {
  res.json(await Application.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true }));
});

router.put('/reject/:id', async (req, res) => {
  res.json(await Application.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true }));
});

router.delete('/:id', async (req, res) => {
  await Application.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;