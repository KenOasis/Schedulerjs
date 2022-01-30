"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Employees", {
      employee_id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(16),
        unique: true,
      },
      firstname: {
        allowNull: false,
        type: Sequelize.STRING(32),
      },
      lastname: {
        allowNull: false,
        type: Sequelize.STRING(32),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(256),
      },
      role_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Roles",
          key: "role_id",
        },
        onDelete: "CASCADE",
      },
      safety_pin: {
        allowNull: false,
        type: Sequelize.STRING(64),
      },
      emergency_contact: {
        allowNull: false,
        type: Sequelize.STRING(16),
      },
      activated: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Employees");
  },
};
