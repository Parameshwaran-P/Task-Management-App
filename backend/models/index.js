const sequelize = require('../config/dbConfig');
const User = require('./User');

const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log('Database synced');
  } catch (error) {
    console.error('Error syncing database', error);
  }
};

module.exports = {
  User,
  syncDatabase,
};
