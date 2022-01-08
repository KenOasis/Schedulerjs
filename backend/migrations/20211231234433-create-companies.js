"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Companies", {
      company_id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(64),
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING(256),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(64),
        unique: true,
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING(16),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(256),
      },
    });
    await queryInterface.addConstraint("Companies", {
      type: "check",
      fields: ["email"],
      where: {
        email: {
          [Sequelize.Op.regexp]:
            "^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$",
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Companies");
  },
};
