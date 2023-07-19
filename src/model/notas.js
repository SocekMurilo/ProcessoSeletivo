const Sequelize = require('sequelize');
const database = require('../config/db');

const etapas = require('./etapas');
const participante = require('./participante');

const notas = database.define('Nota', {
    IDNota: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
    },
    Nota: {
    type: Sequelize.INTEGER,
    allowNull: true
    }
});

notas.belongsTo(etapas, {
    constraint: true, //Garantir integridade referencial
    foreignKey: 'IDEtapa'
});

notas.belongsTo(participante, {
    constraint: true, //Garantir integridade referencial
    foreignKey: 'IDParticipante'
});

module.exports = notas;