// Importação
const Sequelize = require('sequelize');
const database = require('../config/db');

const processos = require('./processos');
const etapas = require('./etapas');
const notas = require('./notas');

// Criando a tabela Participante
const participante = database.define('Participante', {
    IDParticipante: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
    },
    Nome: {
    type: Sequelize.STRING(60),
    allowNull: false
    },
    Telefone: {
    type: Sequelize.STRING(50),
    allowNull: false
    },
    Nascimento: {
    type: Sequelize.DATE,
    allowNull: false
    },
    Idade: {
    type: Sequelize.INTEGER,
    allowNull: false
    },
    Email: {
    type: Sequelize.STRING(255),
    allowNull: false
    },
    Cursos: {
    type: Sequelize.STRING(255),
    allowNull: false
    },
    Idiomas: {
    type: Sequelize.STRING(255),
    allowNull: false
    },
    Curriculo: {
    type: Sequelize.STRING(255),
    allowNull: false
    },
    Video: {
    type: Sequelize.STRING(255),
    allowNull: false
    }
});

participante.belongsTo(processos, {
    constraint: true, //Garantir integridade referencial
    foreignKey: 'IDProcesso'
});
participante.belongsTo(etapas, {
    constraint: true, //Garantir integridade referencial
    foreignKey: 'IDEtapa'
});
participante.belongsTo(notas, {
    constraint: true, //Garantir integridade referencial
    foreignKey: 'IDNota'
});

// Exportando essa tabela
module.exports = participante;