"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  student.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      enrollmentNo: {
        type: DataTypes.BIGINT,
        field: "enrollment_no",
      },
      Class: {
        type: DataTypes.ENUM("10th", "11th", "12th"),
      },
      branch: {
        type: DataTypes.ENUM("Mathematics", "Biology", "Commerce", "Arts"),
      },
      totalFees: {
        type: DataTypes.BIGINT,
        field: "total_fees",
      },
      paidFees: {
        type: DataTypes.BIGINT,
        field: "paid_fees",
      },
      dueFees: {
        type: DataTypes.BIGINT,
        field: "due_fees",
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
      modelName: "student",
    }
  );
  return student;
};
