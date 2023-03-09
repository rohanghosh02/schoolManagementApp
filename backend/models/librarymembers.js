"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class libraryMembers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  libraryMembers.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      fullName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      memberId: {
        type: DataTypes.INTEGER,
        field: "member_id",
      },
      dateOfJoin: {
        type: DataTypes.DATEONLY,
        field: "date_of_join",
      },
      memberType: {
        type: DataTypes.ENUM("student", "liberian"),
        field: "member_type",
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
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
      modelName: "libraryMembers",
    }
  );
  return libraryMembers;
};
