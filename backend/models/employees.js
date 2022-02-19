"use strict";
const { Model } = require("sequelize");
const Deferrable = require("sequelize").Deferrable;
module.exports = (sequelize, DataTypes) => {
  class Employees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employees.init(
    {
      employee_id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING(16),
      },
      firstname: {
        allowNull: false,
        type: DataTypes.STRING(32),
      },
      lastname: {
        allowNull: false,
        type: DataTypes.STRING(32),
      },
      safety_pin: {
        allowNull: false,
        type: DataTypes.STRING(64),
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(64),
      },
      role_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Roles",
          key: "role_id",
        },
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
      emergency_contact: {
        allowNull: false,
        type: DataTypes.STRING(16),
      },
      activated: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Employees",
    }
  );
  return Employees;
};
