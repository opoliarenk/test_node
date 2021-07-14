'use strict';

const Sequelize = require("sequelize");

module.exports = sequelize.define("Film", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    filmId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    starName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
})