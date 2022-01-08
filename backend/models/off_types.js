"use strict";
const { Model } = require("sequelize");
const Deferrable = require("sequelize").Deferrable;
module.exports = (sequelize, DataTypes) => {
  class Off_Types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Off_Types.init(
    {
      off_id: {
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
      name: {
        allowNull: false,
        type: DataTypes.STRING(64),
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING(256),
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Off_Types",
    }
  );
  return Off_Types;
};
