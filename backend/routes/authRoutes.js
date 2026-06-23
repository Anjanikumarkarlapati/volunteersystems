const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      message: 'User registered successfully',
      user
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  console.log("LOGIN HIT");
  console.log(req.body);

  try {
    const { email, password } = req.body;

    console.log("Checking user...");
    const user = await User.findOne({ email });

    console.log("User found:", user);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    console.log("Checking password...");
    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password result:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    console.log("Creating token...");
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;