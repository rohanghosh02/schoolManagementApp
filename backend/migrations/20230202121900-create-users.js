"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
        field: "first_name",
      },
      lastName: {
        type: Sequelize.STRING,
        field: "last_name",
      },
      dob: {
        type: Sequelize.DATEONLY,
      },
      email: {
        type: Sequelize.STRING,
        field: "email",
      },
      password: {
        type: Sequelize.STRING,
      },
      number: {
        type: Sequelize.BIGINT,
      },
      role: {
        type: Sequelize.ENUM("admin", "teacher", "student"),
      },
      status: {
        type: Sequelize.ENUM("active", "inactive"),
        defaultValue: "inactive",
      },
      registrationId: {
        type: Sequelize.BIGINT,
        field: "registration_id",
      },
      gender: {
        type: Sequelize.ENUM("male", "female"),
      },
      address: {
        type: Sequelize.STRING,
      },
      notificationId: {
        type: Sequelize.STRING,
        field: "notification_id",
        defaultValue: null,
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
    await queryInterface.dropTable("users");
  },
};
