"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Schedules", {
      schedule_id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      group_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Groups",
          key: "group_id",
        },
        onDelete: "CASCADE",
      },
      schedule_date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.literal("NOW()"),
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Schedules");
  },
};
