"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Title: {
        type: Sequelize.TEXT,
      },
      UserId: {
        type: Sequelize.INTEGER,
      },
      isAdmin: {
        type: Sequelize.ENUM("yes", "no"),
        defaultValue: "no",
      },
      Image: {
        type: Sequelize.STRING,
      },
      Description: {
        type: Sequelize.TEXT,
      },
      total_likes: {
        type: Sequelize.BIGINT,
      },
      total_comment: {
        type: Sequelize.BIGINT,
      },
      deletedAt: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("Posts");
  },
};
