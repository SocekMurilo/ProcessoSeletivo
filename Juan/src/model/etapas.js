const Sequelize = require('sequelize');
const database = require('../config/db');

const processos = require('./processos');

const etapas = database.define('Etapa', {
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
    type: Sequelize.INTEGER,
    allowNull: false
    }
});

etapas.belongsTo(processos, {
    constraint: true, //Garantir integridade referencial
    foreignKey: 'IDProcesso'
});

module.exports = etapas;