const connection = require("../models");
const { sequelize, Sequelize } = connection;
const { Op } = Sequelize;
const Models = sequelize.models;
const bcrypt = require("bcrypt");

const { users, books, student, teacher } = Models;

const adminService = {
  login: async (email) => {
    const userResult = await users.findOne({
      where: { email, role: "admin" },
    });
    if (userResult) {
      return userResult;
    } else {
      return false;
    }
  },
  emailExist: async (email) => {
    const userResult = await users.count({
      where: { email, role: "admin" },
    });
    if (userResult) {
      return true;
    } else {
      return false;
    }
  },
  findStudent: async (enrollmentNo) => {
    const result = await student.findOne({
      where: {
        enrollmentNo,
      },
    });
    if (result) {
      return result;
    } else {
      return false;
    }
  },
  findTeacher: async (teacherId) => {
    const result = await teacher.findOne({
      where: {
        teacherId,
      },
    });
    if (result) {
      return result;
    } else {
      return false;
    }
  },
  findUser: async (registrationId, role) => {
    let params = {};
    params.where = {
      registrationId,
    };
    if (role) {
      params.where = {
        registrationId,
        role,
      };
    }

    const result = await users.findOne({
      where: params.where,
    });
    if (result) {
      return result;
    } else {
      return false;
    }
  },
  verifyUser: async (data) => {
    const result = await users.update(
      { status: data.status },
      {
        where: { registrationId: data.registrationId },
      }
    );
    if (result) {
      return result;
    } else {
      return false;
    }
  },

  userList: async (data) => {
    let params = {
      where: {
        id: { [Op.ne]: data.id },
      },
    };

    if (data.status || data.role) {
      params.where = {
        [Op.or]: [
          { status: data.status },
          {
            role: data.role,
          },
        ],
      };
    }
    if (data.status && data.role) {
      params.where = {
        [Op.and]: [
          { status: data.status },
          {
            role: data.role,
          },
        ],
      };
    }

    if (data.stDOB && data.enDOB) {
      params.where = {
        dob: {
          [Op.between]: [data.enDOB, data.stDOB],
        },
      };
    }

    if (data.search != "") {
      params.where = {
        [Op.or]: [
          { firstName: { [Op.like]: "%" + data.search + "%" } },
          { lastName: { [Op.like]: "%" + data.search + "%" } },
        ],
      };
    }
    const result = await users.findAll({
      where: params.where,
      order: [[data.orderBy, data.orderType]],
      offset: data.offset,
      limit: data.limit,
    });
    if (result) {
      return result;
    } else {
      return false;
    }
  },
  addStudent: async (data) => {
    return student.create(data);
  },
  addTeacher: async (data) => {
    return teacher.create(data);
  },

  deleteUser: async (data) => {
    const result = await users.destroy({
      where: { registrationId: data.registrationId, role: data.role },
    });
    if (result) {
      return result;
    } else {
      return false;
    }
  },
  isBook: async (ISBN) => {
    const result = await books.findOne({
      where: { ISBN },
    });
    if (result) {
      return true;
    } else {
      return false;
    }
  },
  addBook: async (data) => {
    const result = await books.create(data);
    if (result) {
      return result.dataValues;
    } else {
      return false;
    }
  },
  books: async (data) => {
    const result = await books.findAll(data);
    if (result) {
      return result;
    } else {
      return false;
    }
  },
};

// export module to use on other files
module.exports = adminService;
