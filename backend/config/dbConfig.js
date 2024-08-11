const { Sequelize } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres', // or 'mysql', 'sqlite', etc.
});

module.exports = sequelize;
