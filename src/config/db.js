const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ProcessoSeletivo', 'ProcessoSeletivo', 'etstech31415', {
  host: 'localhost',
  dialect: 'mssql',
  port: 61370
});

module.exports = sequelize;
