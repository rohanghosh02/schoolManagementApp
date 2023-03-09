"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      Title: {
        type: DataTypes.TEXT,
      },
      UserId: {
        type: DataTypes.INTEGER,
      },
      isAdmin: {
        type: DataTypes.ENUM("yes", "no"),
        defaultValue: "no",
      },
      Image: {
        type: DataTypes.STRING,
      },
      Description: {
        type: DataTypes.TEXT,
      },
      total_likes: {
        type: DataTypes.BIGINT,
      },
      total_comment: {
        type: DataTypes.BIGINT,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
