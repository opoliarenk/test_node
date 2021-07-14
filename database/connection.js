'use strict';

const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.USER, process.env.PASSWORD, {
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false,
});

module.exports = sequelize;
global.sequelize = sequelize;