"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Companies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Companies.init(
    {
      company_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING(256),
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(64),
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING(16),
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(256),
      },
    },
    {
      sequelize,
      modelName: "Companies",
    }
  );
  return Companies;
};
