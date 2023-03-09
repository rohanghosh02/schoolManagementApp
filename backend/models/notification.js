"use strict";
const { Model, ENUM } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      notification.belongsTo(models.users, {
        foreignKey: "senderOwnerId",
        as: "userInformation",
      });
    }
  }
  notification.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      message: DataTypes.TEXT,
      actionId: {
        type: DataTypes.INTEGER,
        field: "action_id",
      },
      senderOwnerId: {
        type: DataTypes.BIGINT,
        field: "sender_owner_id",
      },
      userId: {
        type: DataTypes.BIGINT,
        field: "user_id",
      },
      type: {
        type: DataTypes.ENUM(
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
        type: DataTypes.ENUM("read", "unread"),
        defaultValue: "unread",
      },

      deletedAt: {
        type: DataTypes.DATE,
        field: "deleted_at",
      },
    },
    {
      sequelize,
      modelName: "notification",
    }
  );
  return notification;
};
