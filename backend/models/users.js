"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: {
        type: DataTypes.STRING,
        field: "first_name",
      },
      lastName: {
        type: DataTypes.STRING,
        field: "last_name",
      },
      dob: {
        type: DataTypes.DATEONLY,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      number: {
        type: DataTypes.BIGINT,
      },

      role: {
        type: DataTypes.ENUM("admin", "teacher", "student"),
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "inactive",
      },
      registrationId: {
        type: DataTypes.BIGINT,
        field: "registration_id",
      },
      gender: {
        type: DataTypes.ENUM("male", "female"),
      },
      address: {
        type: DataTypes.STRING,
      },
      notificationId: {
        type: DataTypes.STRING,
        field: "notification_id",
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
        allowNull: true,
        type: DataTypes.DATE,
        field: "deleted_at",
      },
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
