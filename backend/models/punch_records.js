"use strict";
const { Model } = require("sequelize");
const Deferrable = require("sequelize").Deferrable;
module.exports = (sequelize, DataTypes) => {
  class Punch_Records extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Punch_Records.belongsTo(models.Employees, {
        as: "employee",
        foreignKey: "employee_id",
      });
    }
  }
  Punch_Records.init(
    {
      punch_record_id: {
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
      recorded_date: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      recorded_time: {
        allowNull: false,
        type: DataTypes.TIME,
      },
      modified_by: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: "Employees",
          key: "employee_id",
        },
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Punch_Records",
    }
  );
  return Punch_Records;
};
