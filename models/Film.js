'use strict';

const Sequelize = require("sequelize");

module.exports = sequelize.define("Film", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    releaseYear: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    format: {
        type: Sequelize.ENUM,
        values: ['VHS', 'DVD', 'Blu-Ray'],
    }
})