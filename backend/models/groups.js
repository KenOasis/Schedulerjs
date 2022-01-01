"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Groups.init(
    {
      group_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      company_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Companies",
          key: "company_id",
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
      sequelize,
      modelName: "Groups",
    }
  );
  return Groups;
};
