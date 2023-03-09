"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("timeTables", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Class: {
        type: Sequelize.ENUM("10th", "11th", "12th"),
      },
      fileName: {
        type: Sequelize.STRING,
        field: "file_name",
      },
      path: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("timeTables");
  },
};
