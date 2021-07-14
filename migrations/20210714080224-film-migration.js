'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("films", {
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
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("films");
  }
};
