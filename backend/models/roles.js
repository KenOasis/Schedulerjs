"use strict";
const { Model } = require("sequelize");
const Deferrable = require("sequelize").Deferrable;
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Roles.belongsTo(models.Groups, { as: "group", foreignKey: "group_id" });
      Roles.hasMany(models.Role_Actions, {
        as: "role_action",
        foreignKey: "role_id",
      });
    }
  }
  Roles.init(
    {
      role_id: {
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
      title: {
        allowNull: false,
        type: DataTypes.STRING(64),
      },
      abbreviation: {
        allowNull: false,
        type: DataTypes.STRING(8),
      },
      priority: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING(256),
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Roles",
    }
  );
  return Roles;
};
