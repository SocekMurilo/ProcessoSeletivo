const db = require ("../config/db")
const Sequelize = require("sequelize");

const User = db.define('Usuarios', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    RA: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// User.sync();

module.exports = User;