const Sequelize = require('sequelize');
const database = require('../config/db');

const etapas = require('./etapas');

const notas = database.define('Nota', {
    IDNota: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
    },
    Nota: {
    type: Sequelize.INTEGER,
    allowNull: false
    }
});

notas.belongsTo(etapas, {
    constraint: true, //Garantir integridade referencial
    foreignKey: 'IDEtapa'
});

module.exports = notas;