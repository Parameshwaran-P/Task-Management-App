const { Sequelize } = require('sequelize');
const dbConfig = require('../config/dbConfig');

const sequelize = new Sequelize(dbConfig.development);

const User = require('./User')(sequelize);
const Task = require('./Task')(sequelize);

User.hasMany(Task, { as: 'tasks' });
Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = { sequelize, User, Task };
