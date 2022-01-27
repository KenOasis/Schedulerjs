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
          unique: ["company_group_name_unique"],
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING(64),
          unique: ["company_group_name_unique"],
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
          company_group_name_unique: {
            fields: ["company_id", "name"],
          },
        },
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Groups");
  },
};
