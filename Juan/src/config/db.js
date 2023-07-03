const sequelize = require('sequelize');

//configurações da base de dados
const database = new sequelize('ProcessoSeletivo', 'ProcessoSeletivo', 'etstech31415',
{
    dialect: 'mssql', host:'localhost', port: 61370
});

database.sync();

module.exports = database;