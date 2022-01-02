"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Shifts", {
      shift_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      schedule_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Schedules",
          key: "schedule_id",
        },
        onDelete: "CASCADE",
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
      off_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Off_Types",
          key: "off_id",
        },
        onDelete: "CASCADE",
      },
      starts_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      ends_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Shifts");
  },
};
