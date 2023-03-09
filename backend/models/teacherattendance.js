"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class teacherAttendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  teacherAttendance.init(
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
      status: {
        type: DataTypes.ENUM("present", "absent"),
        defaultValue: "absent",
      },
      date: {
        type: DataTypes.DATEONLY,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "teacherAttendance",
    }
  );
  return teacherAttendance;
};
