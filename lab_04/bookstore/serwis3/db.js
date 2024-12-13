const { Sequelize } = require('sequelize');

// Tworzymy połączenie z SQLite za pomocą Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.db',
});

module.exports = sequelize;