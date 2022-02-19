"use strict";
const { Model } = require("sequelize");
const Deferrable = require("sequelize").Deferrable;
module.exports = (sequelize, DataTypes) => {
  class Shifts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Shifts.init(
    {
      shift_id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      schedule_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Schedules",
          key: "schedule_id",
        },
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
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
      starts_at: {
        allowNull: false,
        type: DataTypes.TIME,
      },
      ends_at: {
        allowNull: false,
        type: DataTypes.TIME,
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Shifts",
    }
  );
  return Shifts;
};
