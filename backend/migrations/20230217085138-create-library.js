"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("libraries", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fullName: {
        type: Sequelize.STRING,
        field: "full_name",
      },
      email: {
        type: Sequelize.STRING,
      },
      memberId: {
        type: Sequelize.BIGINT,
        field: "member_id",
      },
      ISBN: {
        type: Sequelize.STRING,
      },
      bookName: {
        type: Sequelize.STRING,
        field: "book_name",
      },
      dateIssued: {
        type: Sequelize.DATEONLY,
        field: "date_issued",
      },
      issuedBy: {
        type: Sequelize.STRING,
        field: "issued_by",
      },
      dateReturn: {
        type: Sequelize.DATEONLY,
        field: "date_return",
      },
      status: {
        type: Sequelize.ENUM("pending", "returned"),
        defaultValue: "pending",
      },
      lateFine: {
        type: Sequelize.INTEGER,
        field: "late_fine",
        defaultValue: 0,
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
    await queryInterface.dropTable("libraries");
  },
};
