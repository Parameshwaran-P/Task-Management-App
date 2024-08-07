const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('taskapp', 'postgres', 'paramesh', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
