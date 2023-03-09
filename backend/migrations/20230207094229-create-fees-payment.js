"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("FeesPayments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      enrollmentNo: {
        type: Sequelize.BIGINT,
        field: "enrollment_no",
      },
      Class: {
        type: Sequelize.ENUM("10th", "11th", "12th"),
      },
      amount: {
        type: Sequelize.BIGINT,
      },
      year: {
        type: Sequelize.BIGINT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("FeesPayments");
  },
};
