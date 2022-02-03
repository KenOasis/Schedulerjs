"use strict";
const { Model } = require("sequelize");
const Deferrable = require("sequelize").Deferrable;
module.exports = (sequelize, DataTypes) => {
  class Employee_Role_Records extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employee_Role_Records.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      employee_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Employees",
          key: "employee_id",
        },
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
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
      current: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      starts_at: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        defaultValue: new Date(),
      },
      ends_at: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        defaultValue: new Date(),
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Employee_Role_Records",
    }
  );
  return Employee_Role_Records;
};
