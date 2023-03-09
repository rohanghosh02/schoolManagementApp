"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("studentAttendances", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      enrollmentNo: {
        type: Sequelize.BIGINT,
        field: "enrollment_no",
      },
      teacherId: {
        type: Sequelize.BIGINT,
        field: "teacher_id",
      },
      status: {
        type: Sequelize.ENUM("present", "absent"),
        defaultValue: "absent",
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("studentAttendances");
  },
};
