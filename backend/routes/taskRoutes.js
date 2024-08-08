const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await pool.query('SELECT * FROM tasks');
    res.json(tasks.rows);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Create a new task
router.post('/tasks', async (req, res) => {
  const { description } = req.body;
  try {
    const newTask = await pool.query(
      'INSERT INTO tasks (description) VALUES ($1) RETURNING *',
      [description]
    );
    res.json(newTask.rows[0]);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete a task
router.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.send('Task deleted');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
