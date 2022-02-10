"use strict";
const { Model } = require("sequelize");
const Deferrable = require("sequelize").Deferrable;
module.exports = (sequelize, DataTypes) => {
  class Off_Records extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Off_Records.init(
    {
      off_record_id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      requested_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      off_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Off_Types",
          key: "off_id",
        },
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
      employee_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Employees",
          key: "employee_id",
        },
        onDelete: "CASCADE",
      },
      starts_at: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      ends_at: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      approved: {
        type: DataTypes.BOOLEAN,
      },
      reason: {
        allowNull: false,
        type: DataTypes.STRING(256),
      },
      approved_by: {
        type: DataTypes.INTEGER,
        references: {
          model: "Employees",
          key: "employee_id",
        },
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
      comment: {
        type: DataTypes.STRING(256),
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Off_Records",
    }
  );
  return Off_Records;
};
