"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Employee_Role_Records", {
      id: {
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
      role_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Roles",
          key: "role_id",
        },
        onDelete: "CASCADE",
      },
      current: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      starts_at: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.literal("NOW()"),
      },
      ends_at: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.literal("NOW()"),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Employee_Role_Records");
  },
};
