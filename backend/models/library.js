"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class library extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  library.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      fullName: {
        type: DataTypes.STRING,
        field: "full_name",
      },
      email: {
        type: DataTypes.STRING,
      },
      memberId: {
        type: DataTypes.BIGINT,
        field: "member_id",
      },
      ISBN: {
        type: DataTypes.STRING,
      },
      bookName: {
        type: DataTypes.STRING,
        field: "book_name",
      },
      dateIssued: {
        type: DataTypes.DATEONLY,
        field: "date_issued",
      },
      issuedBy: {
        type: DataTypes.STRING,
        field: "issued_by",
      },
      dateReturn: {
        type: DataTypes.DATEONLY,
        field: "date_return",
      },
      status: {
        type: DataTypes.ENUM("pending", "returned"),
        defaultValue: "pending",
      },
      lateFine: {
        type: DataTypes.INTEGER,
        field: "late_fine",
        defaultValue: 0,
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "updated_at",
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: "deleted_at",
      },
    },
    {
      sequelize,
      modelName: "library",
    }
  );
  return library;
};
