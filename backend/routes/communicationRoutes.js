const express = require('express');
const router = express.Router();
const Communication = require('../models/Communication');

router.get('/', async (req, res) => {
  res.json(await Communication.find());
});

module.exports = router;