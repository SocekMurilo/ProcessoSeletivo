// Importação
const Sequelize = require('sequelize');
const database = require('../config/db');

const processos = require('./processos');
const participante = require('./participante');

const participanteProcesso = database.define('ParticipanteProcesso', {
    IDParticipanteProcesso: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
    },
    Status: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
    }
});

participanteProcesso.belongsTo(processos, {
    constraint: true, //Garantir integridade referencial
    foreignKey: 'IDProcesso'
});
participanteProcesso.belongsTo(participante, {
    constraint: true, //Garantir integridade referencial
    foreignKey: 'IDParticipante'
});

module.exports = participanteProcesso;