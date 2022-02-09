"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Punch_Records", {
      punch_record_id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      shift_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Shifts",
          key: "shift_id",
        },
        onDelete: "CASCADE",
      },
      recorded_time: {
        allowNull: false,
        type: Sequelize.TIME,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Punch_Records");
  },
};
