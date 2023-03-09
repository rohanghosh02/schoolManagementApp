"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  teacher.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      teacherId: {
        type: DataTypes.BIGINT,
        field: "teacher_id",
      },
      email: {
        type: DataTypes.STRING,
      },
      Class: {
        type: DataTypes.ENUM("10th", "11th", "12th"),
      },
      branch: {
        type: DataTypes.ENUM("Mathematics", "Biology", "Commerce", "Arts"),
      },
      salary: {
        type: DataTypes.BIGINT,
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
      modelName: "teacher",
    }
  );
  return teacher;
};
