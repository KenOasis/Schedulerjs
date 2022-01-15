"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Actions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Actions.init(
    {
      action_id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
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
      modelName: "Actions",
    }
  );
  return Actions;
};
