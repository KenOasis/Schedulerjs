"use strict";
const { Model } = require("sequelize");
const Deferrable = require("sequelize").Deferrable;
module.exports = (sequelize, DataTypes) => {
  class Available_Time extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Available_Time.init(
    {
      available_time_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      employee_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Employees",
          key: "employee_id",
        },
        deferrable: Deferrable.INITIALLT_IMMEDIATE,
      },
      day: {
        allowNull: "false",
        type: DataTypes.ENUM("SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"),
      },
      effected_start: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      effected_end: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      starts_at: {
        allowNull: false,
        type: DataTypes.TIME,
      },
      ends_at: {
        allowNull: false,
        type: DataTypes.TIME,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.fn("NOW"),
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Available_Time",
    }
  );
  return Available_Time;
};
