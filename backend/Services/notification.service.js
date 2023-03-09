const connection = require("../models");
const { sequelize, Sequelize } = connection;
const { Op } = Sequelize;
const Models = sequelize.models;
const { users, notification } = Models;

const notificationService = {
  sendNotification: async (data) => {
    const result = await notification.create(data);
    if (result) return result;
    return false;
  },
  list: async (data) => {
    let params = {};
    params.where = {
      userId: data.userId,
    };

    if (data.status) {
      params.where = {
        status: data.status,
      };
    }
    if (data.search) {
      params.where = {
        [Op.or]: [
          { title: { [Op.like]: "%" + data.search + "%" } },
          { message: { [Op.like]: "%" + data.search + "%" } },
        ],
      };
    }

    const result = await notification.findAll({
      where: params.where,
      offset: data.offset,
      limit: data.limit,
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },

      include: [
        {
          model: users,
          as: "userInformation",
          attributes: {
            exclude: [
              "password",
              "totalFollowers",
              "totalFollowing",
              "createdAt",
              "updatedAt",
              "deletedAt",
            ],
          },
        },
      ],
    });
    if (result) return result;
    return false;
  },
  count: async (userId) => {
    const result = await notification.count({
      where: {
        userId,
      },
    });
    if (result) return result;
    else return false;
  },
};
module.exports = notificationService;
