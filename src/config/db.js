const sequelize = require('sequelize');

const database = new sequelize('ProjetoWEB', 'ProjetoWEB', 'ProjetoWEB123456789',
{
 dialect: 'mssql', host:'localhost', port: 59248
});
module.exports = database;
