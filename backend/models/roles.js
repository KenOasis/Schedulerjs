"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  roles.init(
    {
      role_id: {
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
      sequelize,
      modelName: "roles",
    }
  );
  return Roles;
};
