"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role_Actions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Role_actions.init(
    {
      action_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      role_id: {
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
      sequelize,
      modelName: "Role_Actions",
    }
  );
  return Role_Actions;
};
