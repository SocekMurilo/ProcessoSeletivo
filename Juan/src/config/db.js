const { Sequelize } = require('sequelize');

const database = new Sequelize('ProcessoSeletivo', 'ProcessoSeletivo', 'etstech31415', {
  host: 'localhost',
  dialect: 'mssql',
  port: 60938
});

database.sync();

module.exports = database;
