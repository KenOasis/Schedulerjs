"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Available_Times", {
      available_time_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      employee_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Employees",
          key: "employee_id",
        },
        onDelete: "CASCADE",
      },
      day: {
        allowNull: "false",
        type: Sequelize.ENUM("SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"),
      },
      effected_start: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      effected_end: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      starts_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      ends_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Available_Times");
  },
};
