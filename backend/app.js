const express = require('express');
const pool = require('./config/db'); // Assuming db.js is in the same directory

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});