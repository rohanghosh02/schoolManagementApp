"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class studentAttendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  studentAttendance.init(
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
      teacherId: {
        type: DataTypes.BIGINT,
        field: "teacher_id",
      },
      date: {
        type: DataTypes.DATEONLY,
      },
      status: {
        type: DataTypes.ENUM("present", "absent"),
        defaultValue: "absent",
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
      modelName: "studentAttendance",
    }
  );
  return studentAttendance;
};
