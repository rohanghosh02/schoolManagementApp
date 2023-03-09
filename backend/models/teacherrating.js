"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TeacherRating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TeacherRating.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      teacherId: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      points: {
        type: DataTypes.ENUM("0", "1", "2", "3", "4", "5"),
        defaultValue: "0",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "TeacherRating",
    }
  );
  return TeacherRating;
};
