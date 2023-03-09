"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class student_marks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  student_marks.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      enrollmentNo: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "enrollment_no",
      },
      Class: {
        type: DataTypes.ENUM("10th", "11th", "12th"),
      },
      subject: {
        type: DataTypes.ENUM(
          "Hindi",
          "English",
          "Mathematics",
          "Science",
          "Social Science",
          "Physics",
          "Chemistry",
          "Biology",
          "Accountancy,",
          "Business Studies",
          "Economics",
          "History",
          "Geography",
          "Political Science"
        ),
      },

      branch: {
        type: DataTypes.ENUM("Mathematics", "Biology", "Commerce", "Arts"),
      },

      theoryMarks: {
        type: DataTypes.INTEGER,
        field: "theory_marks",
        defaultValue: 0,
      },
      practicalMarks: {
        type: DataTypes.INTEGER,
        field: "practical_marks",
        defaultValue: 0,
      },
      totalMarks: {
        type: DataTypes.INTEGER,
        defaultValue: 100,
        field: "total_marks",
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
      modelName: "student_marks",
    }
  );
  return student_marks;
};
