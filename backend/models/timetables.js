"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class timeTables extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  timeTables.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      Class: {
        type: DataTypes.ENUM("10th", "11th", "12th"),
      },
      fileName: {
        type: DataTypes.STRING,
        field: "file_name",
      },
      path: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "updated_at",
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: "deleted_at",
      },
    },
    {
      sequelize,
      modelName: "timeTables",
    }
  );
  return timeTables;
};
