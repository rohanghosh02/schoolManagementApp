"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class assignment_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  assignment_image.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      teacherId: {
        type: DataTypes.INTEGER,
        field: "teacher_id",
      },
      Class: {
        type: DataTypes.ENUM("10th", "11th", "12th"),
      },
      assignmentImage: {
        type: DataTypes.STRING,
        field: "assignment_image",
      },
      note: {
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
      modelName: "assignment_image",
    }
  );
  return assignment_image;
};
