const connection = require("../models");
const { sequelize } = connection;
const Models = sequelize.models;
const { salary, teacher } = Models;
const { Op } = require("sequelize");

const salaryService = {
  findTeacher: async (teacherId) => {
    let result = await teacher.findOne({
      where: { teacherId },
    });
    if (result) return result.dataValues;
    else return false;
  },
  findSalary: async (teacherId, date) => {
    let result = await salary.findOne({
      where: { teacherId, date },
    });
    if (result) return result.dataValues;
    else return false;
  },

  updatePayment: async (data) => {
    return await salary.create(data);
  },
};

module.exports = salaryService;
