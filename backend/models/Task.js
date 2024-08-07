// models/task.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

class Task extends Model {}

Task.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    modelName: 'Task',
  }
);

module.exports = Task;

