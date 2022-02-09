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
    }
  }
  Punch_Records.init(
    {
      punch_record_id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      shift_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Shifts",
          key: "shift_id",
        },
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
      recorded_time: {
        allowNull: false,
        type: DataTypes.TIME,
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
