"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class exam_forms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  exam_forms.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      examType: {
        type: DataTypes.ENUM("practical", "theory"),
        field: "exam_type",
      },
      Class: {
        type: DataTypes.ENUM("10th", "11th", "12th"),
      },
      fees: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      lateFees: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      startDate: {
        type: DataTypes.DATE,
        field: "start_date",
      },
      endDate: {
        type: DataTypes.DATE,
        field: "end_date",
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
        type: DataTypes.DATE,
        field: "deleted_at",
      },
    },
    {
      sequelize,
      modelName: "exam_forms",
    }
  );
  return exam_forms;
};
