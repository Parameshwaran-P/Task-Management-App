const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const sequelize = require('./config/dbConfig');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Sync database
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
