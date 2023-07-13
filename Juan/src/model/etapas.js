const Sequelize = require('sequelize');
const database = require('../config/db');

const Etapa = database.define('Etapa', {
  IDEtapa: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  Nome: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  Data: {
    type: Sequelize.DATE,
    allowNull: false
  },
  Turno: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  IDProcesso: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Etapa;
