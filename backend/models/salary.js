"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class salary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  salary.init(
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
      salary: {
        type: DataTypes.INTEGER,
      },
      date: {
        type: DataTypes.DATEONLY,
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
      modelName: "salary",
    }
  );
  return salary;
};
