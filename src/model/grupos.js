const Sequelize = require('sequelize');
const database = require('../config/db');

const Etapa = require('./etapas');
const notas = require('./notas');
const Processo = require('.//processos');
const participante = require('./participante');

const grupos = database.define('Grupos', {
    IDGrupo: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
    },
    NovoGrupo: {
    type: Sequelize.STRING(100),
    allowNull: false
    },
    NumEtapas: {
    type: Sequelize.INTEGER,
    allowNull: false
    }
});

grupos.belongsTo(Etapa, {
    constraint: true,
    foreignKey: 'IDEtapa'
});
grupos.belongsTo(participante, {
    constraint: true, 
    foreignKey: 'IDEtapa'
});
grupos.belongsTo(Processo, {
    constraint: true, 
    foreignKey: 'IDEtapa'
});
grupos.belongsTo(notas, {
    constraint: true, 
    foreignKey: 'IDEtapa'
});

module.exports = grupos;