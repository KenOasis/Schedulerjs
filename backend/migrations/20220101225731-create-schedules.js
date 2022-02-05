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
      day: {
        allowNull: "false",
        type: Sequelize.ENUM("SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"),
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      },
      published: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Schedules");
  },
};
