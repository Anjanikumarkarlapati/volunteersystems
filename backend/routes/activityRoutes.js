const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');

router.get('/', async (req, res) => {
  res.json(await Activity.find());
});

router.post('/', async (req, res) => {
  res.json(await Activity.create(req.body));
});

module.exports = router;