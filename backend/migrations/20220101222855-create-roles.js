"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Roles",
      {
        role_id: {
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
          unique: ["group_title_unqiue", "group_abbreviation_unique"],
        },
        title: {
          allowNull: false,
          type: Sequelize.STRING(64),
          unique: "group_title_unique",
        },
        abbreviation: {
          allowNull: false,
          type: Sequelize.STRING(8),
          unique: "group_abbreviation_unique",
        },
        priority: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        description: {
          allowNull: false,
          type: Sequelize.STRING(256),
        },
      },
      {
        uniqueKeys: {
          group_title_unique: {
            fields: ["group_id", "title"],
          },
          group_abbreviation_unique: {
            fields: ["group_id", "abbreviation"],
          },
        },
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Roles");
  },
};
