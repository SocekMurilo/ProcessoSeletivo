// Importação
const Sequelize = require('sequelize');
const database = require('../config/db');

const processos = require('./processos');

// Criando a tabela Participante
const participante = database.define('Participante', {
    IDParticipante: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
    },
    Nome: {
    type: Sequelize.STRING(255),
    allowNull: false
    },
    Telefone: {
    type: Sequelize.STRING(50),
    allowNull: true,
    defaultValue: 'Não Informado'
    },
    Nascimento: {
    type: Sequelize.STRING(255),
    allowNull: true,
    defaultValue: 'Não Informado'
    },
    Idade: {
    type: Sequelize.STRING(50),
    allowNull: true,
    defaultValue: 'Não Informado'
    },
    Email: {
    type: Sequelize.STRING(255),
    allowNull: true,
    defaultValue: 'Não Informado'
    },
    Cursos: {
    type: Sequelize.STRING(255),
    allowNull: true,
    defaultValue: 'Não Informado'
    },
    Idiomas: {
    type: Sequelize.STRING(255),
    allowNull: true,
    defaultValue: 'Não Informado'
    },
    Curriculo: {
    type: Sequelize.STRING(255),
    allowNull: true,
    defaultValue: 'Não Informado'
    },
    Video: {
    type: Sequelize.STRING(255),
    allowNull: true,
    defaultValue: 'Não Informado'
    }
});

participante.belongsTo(processos, {
    constraint: true, //Garantir integridade referencial
    foreignKey: 'IDProcesso'
});

// Exportando essa tabela
module.exports = participante;