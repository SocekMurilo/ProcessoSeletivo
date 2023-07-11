const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ProcessoSeletivo', 'ProcessoSeletivo', 'etstech31415', {
  host: 'localhost',
  dialect: 'mssql',
  port: 60938
});

sequelize.sync();

module.exports = sequelize;
