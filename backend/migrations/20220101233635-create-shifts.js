"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Shifts", {
      schedule_id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Schedules",
          key: "schedule_id",
        },
        onDelete: "CASCADE",
      },
      employee_id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Employees",
          key: "employee_id",
        },
        onDelete: "CASCADE",
      },
      starts_at: {
        allowNull: false,
        type: Sequelize.TIME,
      },
      ends_at: {
        allowNull: false,
        type: Sequelize.TIME,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Shifts");
  },
};
