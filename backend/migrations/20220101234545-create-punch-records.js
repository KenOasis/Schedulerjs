"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Punch_Records", {
      punch_record_id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      recorded_date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      recorded_time: {
        allowNull: false,
        type: Sequelize.TIME,
      },
      modified_by: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "Employees",
          key: "employee_id",
        },
        onDelete: "CASCADE",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Punch_Records");
  },
};
