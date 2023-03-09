"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FeesPayment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FeesPayment.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      enrollmentNo: {
        type: DataTypes.BIGINT,
        field: "enrollment_no",
      },
      Class: {
        type: DataTypes.ENUM("10th", "11th", "12th"),
      },
      amount: {
        type: DataTypes.BIGINT,
      },
      year: {
        type: DataTypes.BIGINT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "FeesPayment",
    }
  );
  return FeesPayment;
};
