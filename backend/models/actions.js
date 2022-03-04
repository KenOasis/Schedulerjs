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
      Actions.hasMany(models.Role_Actions, {
        as: "role_action",
        foreignKey: "action_id",
      });
    }
  }
  Actions.init(
    {
      action_id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      key: {
        allowNull: false,
        type: DataTypes.STRING(4),
        unique: true,
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
