"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Groups",
      {
        group_id: {
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        company_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "Companies",
            key: "company_id",
          },
          onDelete: "CASCADE",
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING(64),
        },
        description: {
          allowNull: false,
          type: Sequelize.STRING(256),
        },
        activated: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        uniqueKeys: {
          company_group_unique: {
            fields: ["company_id", "group_id"],
          },
        },
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Groups");
  },
};
