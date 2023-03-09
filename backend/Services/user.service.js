const connection = require("../models");
const sequelize = connection.sequelize;
const Models = sequelize.models;
const bcrypt = require("bcrypt");
const { users, studentAttendance, teacherAttendance } = Models;
const { Op } = require("sequelize");

const userService = {
  emailExist: async (data) => {
    return await users.findOne({ where: { email: data.email } });
  },

  numberExist: async (data) => {
    return await users.findOne({
      where: { number: data.number },
    });
  },
  verfyUser: async (data) => {
    return await users.findOne({
      where: { email: data.email, status: "active" },
    });
  },

  signup: async (data) => {
    return await users.create(data);
  },

  matchPassword: async (data, userPassword) => {
    return await bcrypt.compare(data.password, userPassword);
  },

  userProfile: async (userData) => {
    return await users.findOne({
      where: {
        id: userData.authId,
        email: userData.authEmail,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
      },
    });
  },

  updateRequest: async (data, userId) => {
    return await users.update(data, { where: { id: userId } });
  },

  duplicatedEmailExist: async (data) => {
    return await users.findOne({
      where: { email: data.email, id: { [Op.ne]: data.authId } },
    });
  },
  duplicatedNumberExist: async (data) => {
    return await users.findOne({
      where: { number: data.number, id: { [Op.ne]: data.authId } },
    });
  },
  findUser: async (authId) => {
    return await users.findOne({
      where: { id: authId },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
      },
    });
  },

  oldPassword: async (oldPassword, userPassword) => {
    return await bcrypt.compare(oldPassword, userPassword);
  },

  updatePassword: async (data, userId) => {
    return await users.update({ password: data }, { where: { id: userId } });
  },

  userDetails: async (token) => {
    return await users.findOne({ where: { id: token.id } });
  },

  deleteUser: async (data) => {
    return await users.destroy({
      where: {
        registrationId: data.id,
      },
    });
  },
};
module.exports = userService;
