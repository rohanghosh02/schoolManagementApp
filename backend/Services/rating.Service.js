const { where } = require("sequelize");
const connection = require("../models");
const constants = require("./../constants/en");
const { sequelize, Sequelize } = connection;
const { Op } = Sequelize;
const Models = sequelize.models;

const { users, TeacherRating } = Models;
const ratingServices = {
  checkUser: async (token) => {
    let result = await users.findOne({ where: { id: token.id } });
    if (result.role == "student") {
      return result;
    } else {
      console.log("not found Error");
    }
  },

  check_Users: async (token) => {
    let result = await users.findOne({ where: { id: token.id } });

    return result;
  },

  find_TeacherId: async (data) => {
    let result = await users.findOne({ where: { id: data.teacherId } });

    if (result.role == "teacher") {
      return result;
    }
  },
  create: async (insert_data) => {
    return await TeacherRating.create(insert_data);
  },
  Find_rating: async (insert_data) => {
    //  console.log(insert_data);
    return await TeacherRating.findOne({
      where: { teacherId: insert_data.teacherId, userId: insert_data.userId },
    });
  },

  updateRating: async (insert_data) => {
    return await TeacherRating.update(
      {
        points: insert_data.points,
      },
      {
        where: {
          teacherId: insert_data.teacherId,
          userId: insert_data.userId,
        },
      }
    );
  },

  get_avg_rating: async (insert_data) => {
    return await TeacherRating.findAll({
      attributes: [[Sequelize.fn("AVG", Sequelize.col("points")), "avgRating"]],
    });
  },
};

module.exports = ratingServices;
