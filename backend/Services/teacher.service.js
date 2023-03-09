const connection = require("../models");
const sequelize = connection.sequelize;
const Models = sequelize.models;
const bcrypt = require("bcrypt");
const { users, studentAttendance, teacherAttendance, teacher, student } =
  Models;
const { Op } = require("sequelize");

const teacherService = {
  studentFind: async (enrollmentNo) => {
    return await student.findOne({ where: { enrollmentNo } });
  },
  findTeacher: async (teacherId) => {
    return await teacher.findOne({ where: { teacherId } });
  },

  findStudentAttendance: async (data) => {
    return await studentAttendance.findOne({
      where: {
        enrollmentNo: data.enrollmentNo,
        teacherId: data.teacherId,
        date: data.date,
      },
    });
  },

  findTeacherAttendance: async (data) => {
    return await teacherAttendance.findOne({
      where: {
        teacherId: data.teacherId,
        date: data.date,
      },
    });
  },

  makeTeacherAttendance: async (data) => {
    return await teacherAttendance.create(data);
  },

  makeAttendance: async (data) => {
    return await studentAttendance.create(data);
  },

  showTeacherAttendance: async (data) => {
    return await teacherAttendance.count({
      where: {
        teacherId: data.token.registrationId,
        status: "present",
        [Op.and]: [
          sequelize.where(
            sequelize.fn("month", sequelize.col("createdAt")),
            data.month
          ),
          sequelize.where(
            sequelize.fn("year", sequelize.col("createdAt")),
            data.year
          ),
        ],
      },
    });
  },

  showStudentAttendance: async (data) => {
    return await studentAttendance.count({
      where: {
        enrollmentNo: data.token.registrationId,
        status: "present",
        [Op.and]: [
          sequelize.where(
            sequelize.fn("month", sequelize.col("createdAt")),
            data.month
          ),
          sequelize.where(
            sequelize.fn("year", sequelize.col("createdAt")),
            data.year
          ),
        ],
      },
    });
  },
};
module.exports = teacherService;
