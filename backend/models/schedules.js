"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Schedules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Schedules.init(
    {
      schedule_id: {
        allowNull: false,
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
        allowNullL: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.fn("NOW"),
      },
    },
    {
      sequelize,
      modelName: "Schedules",
    }
  );
  return Schedules;
};
