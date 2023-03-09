"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("students", {
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
      Class: {
        type: Sequelize.ENUM("10th", "11th", "12th"),
      },
      branch: {
        type: Sequelize.ENUM("Mathematics", "Biology", "Commerce", "Arts"),
      },

      totalFees: {
        type: Sequelize.BIGINT,
        field: "total_fees",
      },
      paidFees: {
        type: Sequelize.BIGINT,
        field: "paid_fees",
      },
      dueFees: {
        type: Sequelize.BIGINT,
        field: "due_fees",
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
        allowNull: true,
        type: Sequelize.DATE,
        field: "deleted_at",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("students");
  },
};
