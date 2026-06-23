const express = require('express');
const router = express.Router();
const Training = require('../models/Training');

router.get('/', async (req, res) => {
  res.json(await Training.find());
});

router.post('/', async (req, res) => {
  res.json(await Training.create(req.body));
});

router.delete('/:id', async (req, res) => {
  await Training.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;