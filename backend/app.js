const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/dbConfig');

// Import routes
const authRoutes = require('./routes/api/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Sync models and start server
sequelize.sync()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('Unable to sync database:', err));
