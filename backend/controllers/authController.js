const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/dbConfig');

const signup = async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;

    // Basic validation
    if (!username || !password || !email || !phone) {
      return res.status(400).send('All fields are required');
    }

    // Check if the username, email, or phone already exists
    const userCheck = await pool.query(
      'SELECT * FROM users WHERE username = $1 OR email = $2 OR phone = $3',
      [username, email, phone]
    );
    if (userCheck.rows.length > 0) {
      return res.status(400).send('Username, email, or phone already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, password, email, phone) VALUES ($1, $2, $3, $4) RETURNING id',
      [username, hashedPassword, email, phone]
    );
    res.status(201).send('User created');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating user');
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = userResult.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in', error });
  }
};

module.exports = { signup, login };
