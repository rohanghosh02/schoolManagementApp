const multer = require("multer");
const connection = require("../models");
const { sequelize, Sequelize } = connection;
const { Op } = Sequelize;
const Models = sequelize.models;

const { users, timeTables, exam_forms, student_marks } = Models;

const examinationService = {
  addTimeTable: async (data) => {
    const result = await timeTables.create(data);
    if (result) return result;
    return false;
  },
  viewTimeTable: async (Class) => {
    const result = await timeTables.findOne({
      where: {
        Class,
      },
    });
    if (result) return result.dataValues;
    return false;
  },
  addExamForm: async (data) => {
    const result = await exam_forms.create(data);
    if (result) return result.dataValues;
    return false;
  },
  viewExamForms: async () => {
    const result = await exam_forms.findAll();
    if (result) return result;
    return false;
  },
  getOne: async (registrationId) => {
    const result = users.findOne({
      where: {
        role: "student",
        registrationId,
      },
    });

    if (result) return result;
    return false;
  },
  addStudentMarks: async (data) => {
    try {
      const result = await student_marks.bulkCreate(data);
      if (result) return result;
      return false;
    } catch (error) {
      console.log(error);
    }
  },
  viewMarks: async (enrollmentNo) => {
    try {
      const result = await student_marks.findAll({
        where: {
          enrollmentNo,
        },

        attributes: {
          exclude: ["id", "createdAt", "updatedAt", "deletedAt"],
        },
      });
      if (result) return result;
      return false;
    } catch (error) {
      console.log(error);
    }
  },
  allResult: async () => {
    try {
      const result = await student_marks.findAll();
      if (result) return result;
      return false;
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = examinationService;
