"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Off_Records", {
      off_record_id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      requested_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
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
      employee_id: {
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
        type: Sequelize.DATEONLY,
      },
      ends_at: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      approved: {
        type: Sequelize.BOOLEAN,
      },
      reason: {
        allowNull: false,
        type: Sequelize.STRING(256),
      },
      approved_by: {
        type: Sequelize.INTEGER,
        references: {
          model: "Employees",
          key: "employee_id",
        },
        onDelete: "CASCADE",
      },
      comment: {
        type: Sequelize.STRING(256),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Off_Records");
  },
};
