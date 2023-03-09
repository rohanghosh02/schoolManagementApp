const connection = require("../models");
const sequelize = connection.sequelize;
const Models = sequelize.models;
const bcrypt = require("bcrypt");
const { assignment_image } = Models;

const assignmentService = {
  uploadAssignment: async (data) => {
    return await assignment_image.create(data);
  },
};

module.exports = assignmentService;
