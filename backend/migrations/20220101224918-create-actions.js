"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Actions", {
      action_id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      key: {
        allowNull: false,
        type: Sequelize.STRING(4),
        unique: true,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(64),
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(256),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Actions");
  },
};
