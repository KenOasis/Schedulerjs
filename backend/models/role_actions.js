"use strict";
const { Model } = require("sequelize");
const Deferrable = require("sequelize").Deferrable;
module.exports = (sequelize, DataTypes) => {
  class Role_Actions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role_Actions.belongsTo(models.Roles, {
        as: "role",
        foreignKey: "role_id",
      });
      Role_Actions.belongsTo(models.Actions, {
        as: "action",
        foreignKey: "action_id",
      });
    }
  }
  Role_Actions.init(
    {
      action_id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Actions",
          key: "action_id",
        },
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
      role_id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Roles",
          key: "role_id",
        },
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Role_Actions",
    }
  );
  return Role_Actions;
};
