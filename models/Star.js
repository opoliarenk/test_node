'use strict';

const Sequelize = require("sequelize");

module.exports = sequelize.define("Star", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    filmID: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    starName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
})