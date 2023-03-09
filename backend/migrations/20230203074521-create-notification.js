"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("notifications", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      message: Sequelize.TEXT,
      actionId: {
        type: Sequelize.INTEGER,
        field: "action_id",
      },
      senderOwnerId: {
        type: Sequelize.BIGINT,
        field: "sender_owner_id",
      },
      userId: {
        type: Sequelize.BIGINT,
        field: "user_id",
      },
      type: {
        type: Sequelize.ENUM(
          "user_verified",
          "fees",
          "attendance",
          "salary",
          "important_massage",
          "latest_notification",
          "exams",
          "holidays",
          "applications",
          "admission"
        ),
      },

      status: {
        type: Sequelize.ENUM("read", "unread"),
        defaultValue: "unread",
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
        type: Sequelize.DATE,
        field: "deleted_at",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("notifications");
  },
};
