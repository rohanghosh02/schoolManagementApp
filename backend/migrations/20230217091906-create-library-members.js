"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("libraryMembers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fullName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      memberId: {
        type: Sequelize.BIGINT,
        field: "member_id",
      },
      dateOfJoin: {
        type: Sequelize.DATEONLY,
        field: "date_of_join",
      },
      memberType: {
        type: Sequelize.ENUM("student", "liberian"),
        field: "member_type",
      },
      status: {
        type: Sequelize.ENUM("active", "inactive"),
        defaultValue:'active'
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
    await queryInterface.dropTable("libraryMembers");
  },
};
