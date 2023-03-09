const connection = require("../models");
const { sequelize } = connection;
const Models = sequelize.models;
const { student, FeesPayment } = Models;
const { Op } = require("sequelize");

const FeesServices = {
  findStudent: async (enrollmentNo) => {
    let result = await student.findOne({
      where: { enrollmentNo },
    });
    if (result) return result.dataValues;
    else return false;
  },
  updateStudent: async ({ dueFees, paidFees, enrollmentNo }) => {
    return await student.update(
      {
        dueFees,
        paidFees,
      },
      {
        where: {
          enrollmentNo,
        },
      }
    );
  },

  updatePayment: async (data) => {
    return await FeesPayment.create(data);
  },
};

module.exports = FeesServices;
