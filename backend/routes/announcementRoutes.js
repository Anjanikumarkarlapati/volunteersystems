const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');

router.get('/', async (req, res) => {
  res.json(await Announcement.find());
});

router.post('/', async (req, res) => {
  res.json(await Announcement.create(req.body));
});

module.exports = router;