"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Companies", {
      company_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(64),
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING(256),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(64),
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING(16),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(256),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Companies");
  },
};
