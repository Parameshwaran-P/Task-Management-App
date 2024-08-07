// routes/api/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Correct import

// Create a new user
router.post('/signup', async (req, res) => {
  try {
    const user = await User.create(req.body); // User.create should be available
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user || user.password !== req.body.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
