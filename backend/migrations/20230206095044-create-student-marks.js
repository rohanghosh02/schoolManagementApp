"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("student_marks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      enrollmentNo: {
        type: Sequelize.BIGINT,
        allowNull: false,
        field: "enrollment_no",
      },
      Class: {
        type: Sequelize.ENUM("10th", "11th", "12th"),
      
      },
      subject: {
        type: Sequelize.ENUM(
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
        type: Sequelize.ENUM("Mathematics", "Biology", "Commerce", "Arts"),
      },
      theoryMarks: {
        type: Sequelize.INTEGER,
        field: "theory_marks",
        defaultValue: 0,
      },
      practicalMarks: {
        type: Sequelize.INTEGER,
        field: "practical_marks",
        defaultValue: 0,
      },
      totalMarks: {
        type: Sequelize.INTEGER,
        defaultValue: 100,
        field: "total_marks",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "created_at",
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "updated_at",
      },
      deletedAt: {
        type: Sequelize.DATE,
        field: "deleted_at",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("student_marks");
  },
};
