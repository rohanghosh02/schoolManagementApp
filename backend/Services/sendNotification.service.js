const connection = require("../models");
const { sequelize, Sequelize } = connection;
const { Op } = Sequelize;
const Models = sequelize.models;

const { users } = Models;
const sendNotificationService = {
  //   getUsers: async () => {
  //     const result = await users.findAll();
  //     if (result) return result;
  //     return false;
  //   },
  getUser: async (registrationIds) => {
    params = {};

    if (registrationIds) {
      params.where = {
        registrationId: [...registrationIds],
      };
    }
    const result = await users.findAll({
      where: params.where,
    });
    if (result) return result;
    return false;
  },
};

module.exports = sendNotificationService;
