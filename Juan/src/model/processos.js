const Sequelize = require('sequelize');
const database = require('../config/db');
const Etapa = require('./etapas');

const Processo = database.define('Processo', {
  IDProcesso: {
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
  NumEtapas: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

Processo.hasMany(Etapa, { foreignKey: 'IDProcesso', as: 'etapas' });

module.exports = Processo;
