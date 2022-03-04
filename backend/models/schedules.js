"use strict";
const { Model } = require("sequelize");
const Deferrable = require("sequelize").Deferrable;
module.exports = (sequelize, DataTypes) => {
  class Schedules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Schedules.hasMany(models.Shifts, {
        as: "shift",
        foreignKey: "schedule_id",
      });
    }
  }
  Schedules.init(
    {
      schedule_id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      group_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Groups",
          key: "group_id",
        },
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
      schedule_date: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        defaultValue: sequelize.fn("NOW"),
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
      modelName: "Schedules",
    }
  );
  return Schedules;
};
