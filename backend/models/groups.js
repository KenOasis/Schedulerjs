"use strict";
const { Model } = require("sequelize");
const Deferrable = require("sequelize").Deferrable;
module.exports = (sequelize, DataTypes) => {
  class Groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Groups.belongsTo(models.Companies, {
        as: "company",
        foreignKey: "company_id",
      });
    }
  }
  Groups.init(
    {
      group_id: {
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
      activated: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Groups",
    }
  );
  return Groups;
};
