"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("salaries", {
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
      salary: {
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATEONLY,
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
    await queryInterface.dropTable("salaries");
  },
};
