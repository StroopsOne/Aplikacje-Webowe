const { Sequelize } = require('sequelize');

// Utworzenie połączenia z SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

module.exports = sequelize;