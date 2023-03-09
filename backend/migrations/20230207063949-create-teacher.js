"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("teachers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      teacherId: {
        type: Sequelize.BIGINT,
        field: "teacher_id",
      },
      email: {
        type: Sequelize.STRING,
      },
      Class: {
        type: Sequelize.ENUM("10th", "11th", "12th"),
      },
      branch: {
        type: Sequelize.ENUM("Mathematics", "Biology", "Commerce", "Arts"),
      },
      salary: {
        type: Sequelize.BIGINT,
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
    await queryInterface.dropTable("teachers");
  },
};
