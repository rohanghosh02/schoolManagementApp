"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("exam_forms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      examType: {
        type: Sequelize.ENUM("practical", "theory"),
        field: "exam_type",
      },
      Class: {
        type: Sequelize.ENUM("10th", "11th", "12th"),
      },
      fees: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      lateFees: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      startDate: {
        type: Sequelize.DATE,
        field: "start_date",
      },
      endDate: {
        type: Sequelize.DATE,
        field: "end_date",
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
    await queryInterface.dropTable("exam_forms");
  },
};
