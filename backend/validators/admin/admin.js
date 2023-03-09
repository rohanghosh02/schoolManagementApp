const Joi = require("joi");
const { validate } = require("node-cron");
const constants = require("./../../constants/en");
const validators = {
  /**
   * signup
   
   */
  signup: async (data) => {
    var response = {
      validate: false,
    };
    const schema = Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.number().required(),
    });
    const validator = schema.validate(data, {
      errors: { wrap: { label: "" } },
    });

    if (validator.error) {
      const { details } = validator.error;
      const message = details.map((i) => i.message).join(", ");
      response.message = message;
      response.status = constants.NOT_FOUND_STATUS_CODE;
      return response;
    }
    response.validate = true;

    return response;
  },
  login: async (data) => {
    var response = {
      validate: false,
    };
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.number().required(),
    });
    const validator = schema.validate(data, {
      errors: { wrap: { label: "" } },
    });

    if (validator.error) {
      const { details } = validator.error;
      const message = details.map((i) => i.message).join(", ");
      response.message = message;
      response.status = constants.NOT_FOUND_STATUS_CODE;
      return response;
    }
    response.validate = true;

    return response;
  },
  verifyUser: async (data) => {
    var response = {
      validate: false,
    };
    const schema = Joi.object().keys({
      status: Joi.string().required(),
      registrationId: Joi.number().required(),
    });
    const validator = schema.validate(data, {
      errors: { wrap: { label: "" } },
    });

    if (validator.error) {
      const { details } = validator.error;
      const message = details.map((i) => i.message).join(", ");
      response.message = message;
      response.status = constants.NOT_FOUND_STATUS_CODE;
      return response;
    }
    response.validate = true;

    return response;
  },
  addStudent: async (data) => {
    var response = {
      validate: false,
    };
    const schema = Joi.object().keys({
      registrationId: Joi.number().required(),
      status: Joi.string().optional(),
      Class: Joi.string().valid("10th", "11th", "12th").required(),
      branch: Joi.string()
        .valid("Mathematics", "Biology", "Commerce", "Arts")
        .when("Class", {
          is: "10th",
          then: Joi.optional(),
          otherwise: Joi.string().required(),
        }),

      totalFees: Joi.number().required(),
    });
    const validator = schema.validate(data, {
      errors: { wrap: { label: "" } },
    });

    if (validator.error) {
      const { details } = validator.error;
      const message = details.map((i) => i.message).join(", ");
      response.message = message;
      response.status = constants.NOT_FOUND_STATUS_CODE;
      return response;
    }
    response.validate = true;

    return response;
  },
  addTeacher: async (data) => {
    var response = {
      validate: false,
    };
    const schema = Joi.object().keys({
      status: Joi.string().optional(),
      registrationId: Joi.number().required(),
      Class: Joi.string().valid("10th", "11th", "12th").required(),
      branch: Joi.string()
        .valid("Mathematics", "Biology", "Commerce", "Arts")
        .when("Class", {
          is: "10th",
          then: Joi.optional(),
          otherwise: Joi.string().required(),
        }),
      salary: Joi.number().required(),
    });
    const validator = schema.validate(data, {
      errors: { wrap: { label: "" } },
    });

    if (validator.error) {
      const { details } = validator.error;
      const message = details.map((i) => i.message).join(", ");
      response.message = message;
      response.status = constants.NOT_FOUND_STATUS_CODE;
      return response;
    }
    response.validate = true;

    return response;
  },
  deleteUser: async (data) => {
    var response = {
      validate: false,
    };
    const schema = Joi.object().keys({
      role: Joi.string().required(),
      registrationId: Joi.number().required(),
    });
    const validator = schema.validate(data, {
      errors: { wrap: { label: "" } },
    });

    if (validator.error) {
      const { details } = validator.error;
      const message = details.map((i) => i.message).join(", ");
      response.message = message;
      response.status = constants.NOT_FOUND_STATUS_CODE;
      return response;
    }
    response.validate = true;

    return response;
  },
  addTimeTable: async (data) => {
    var response = {
      validate: false,
    };
    const schema = Joi.object().keys({
      Class: Joi.string().valid("10th", "11th", "12th").required(),
    });
    const validator = schema.validate(data, {
      errors: { wrap: { label: "" } },
    });

    if (validator.error) {
      const { details } = validator.error;
      const message = details.map((i) => i.message).join(", ");
      response.message = message;
      response.status = constants.NOT_FOUND_STATUS_CODE;
      return response;
    }
    response.validate = true;

    return response;
  },
  addExamForm: async (data) => {
    var response = {
      validate: false,
    };
    const schema = Joi.object().keys({
      Class: Joi.string().valid("10th", "11th", "12th").required(),
      examType: Joi.string().valid("theory", "practical").required(),
      fees: Joi.number().required(),
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
      lateFees: Joi.number().optional(),
    });
    const validator = schema.validate(data, {
      errors: { wrap: { label: "" } },
    });

    if (validator.error) {
      const { details } = validator.error;
      const message = details.map((i) => i.message).join(", ");
      response.message = message;
      response.status = constants.NOT_FOUND_STATUS_CODE;
      return response;
    }
    response.validate = true;

    return response;
  },
  addStudentMarks: async (data) => {
    var response = {
      validate: false,
    };

    const schema = Joi.object().keys({
      Class: Joi.string().valid("10th", "11th", "12th").required(),
      enrollmentNo: Joi.number().required(),
      branch: Joi.string()
        .valid("Mathematics", "Biology", "Commerce", "Arts")
        .required(),
      marksData: Joi.array().items(
        Joi.object().keys({
          subject: Joi.string()
            .valid(
              "Hindi",
              "English",
              "Mathematics",
              "Science",
              "Social Science",
              "Physics",
              "Chemistry",
              "Biology",
              "Accountancy,",
              "Business Studies",
              "Economics",
              "History",
              "Geography",
              "Political Science"
            )
            .required(),

          theoryMarks: Joi.number().min(0).max(100).required(),
          practicalMarks: Joi.number().when("subject", {
            is: "Science",
            then: Joi.number().min(0).max(25).required(),
          }),
        })
      ),
      totalMarks: Joi.number().required(),
    });
    const validator = schema.validate(data, {
      errors: { wrap: { label: "" } },
    });

    if (validator.error) {
      const { details } = validator.error;
      const message = details.map((i) => i.message).join(", ");
      response.message = message;
      response.status = constants.NOT_FOUND_STATUS_CODE;
      return response;
    }
    response.validate = true;

    return response;
  },

  addBooks: async (data) => {
    var response = {
      validate: false,
    };
    const schema = Joi.object().keys({
      title: Joi.string().required(),
      author: Joi.string().required(),
      ISBN: Joi.string().required(),
      publisher: Joi.string().required(),
      available: Joi.boolean().optional(),
      publicationDate: Joi.date().optional(),
    });
    const validator = schema.validate(data, {
      errors: { wrap: { label: "" } },
    });

    if (validator.error) {
      const { details } = validator.error;
      const message = details.map((i) => i.message).join(", ");
      response.message = message;
      response.status = constants.NOT_FOUND_STATUS_CODE;
      return response;
    }
    response.validate = true;

    return response;
  },

  updateBook: async (data) => {
    var response = {
      validate: false,
    };
    const schema = Joi.object().keys({
      title: Joi.string().optional(),
      author: Joi.string().optional(),
      publisher: Joi.string().optional(),
      available: Joi.boolean().optional(),
      publicationDate: Joi.date().optional(),
    });
    const validator = schema.validate(data, {
      errors: { wrap: { label: "" } },
    });

    if (validator.error) {
      const { details } = validator.error;
      const message = details.map((i) => i.message).join(", ");
      response.message = message;
      response.status = constants.NOT_FOUND_STATUS_CODE;
      return response;
    }
    response.validate = true;

    return response;
  },
  deleteBook: async (data) => {
    var response = {
      validate: false,
    };
    const schema = Joi.object().keys({
      ISBN: Joi.string().required(),
    });
    const validator = schema.validate(data, {
      errors: { wrap: { label: "" } },
    });

    if (validator.error) {
      const { details } = validator.error;
      const message = details.map((i) => i.message).join(", ");
      response.message = message;
      response.status = constants.NOT_FOUND_STATUS_CODE;
      return response;
    }
    response.validate = true;

    return response;
  },
  addMemberToLibrary: async (data) => {
    var response = {
      validate: false,
    };
    const schema = Joi.object().keys({
      memberId: Joi.number().required(),
    });
    const validator = schema.validate(data, {
      errors: { wrap: { label: "" } },
    });

    if (validator.error) {
      const { details } = validator.error;
      const message = details.map((i) => i.message).join(", ");
      response.message = message;
      response.status = constants.NOT_FOUND_STATUS_CODE;
      return response;
    }
    response.validate = true;

    return response;
  },
  issueBook: async (data) => {
    var response = {
      validate: false,
    };
    const schema = Joi.object().keys({
      memberId: Joi.number().required(),
      ISBN: Joi.string().required(),
    });
    const validator = schema.validate(data, {
      errors: { wrap: { label: "" } },
    });

    if (validator.error) {
      const { details } = validator.error;
      const message = details.map((i) => i.message).join(", ");
      response.message = message;
      response.status = constants.NOT_FOUND_STATUS_CODE;
      return response;
    }
    response.validate = true;

    return response;
  },
  updateIssuedBook: async (data) => {
    var response = {
      validate: false,
    };
    const schema = Joi.object().keys({
      memberId: Joi.number().required(),
      ISBN: Joi.string().required(),
      status: Joi.string().valid("returned", "pending").required(),
    });
    const validator = schema.validate(data, {
      errors: { wrap: { label: "" } },
    });

    if (validator.error) {
      const { details } = validator.error;
      const message = details.map((i) => i.message).join(", ");
      response.message = message;
      response.status = constants.NOT_FOUND_STATUS_CODE;
      return response;
    }
    response.validate = true;

    return response;
  },
  issuedBooks: async (data) => {
    var response = {
      validate: false,
    };
    const schema = Joi.object().keys({
      date: Joi.date().optional(),
      ISBN: Joi.string().optional(),
      status: Joi.string().valid("returned", "pending").optional(),
    });
    const validator = schema.validate(data, {
      errors: { wrap: { label: "" } },
    });

    if (validator.error) {
      const { details } = validator.error;
      const message = details.map((i) => i.message).join(", ");
      response.message = message;
      response.status = constants.NOT_FOUND_STATUS_CODE;
      return response;
    }
    response.validate = true;

    return response;
  },
};

// export module to use it on other files
module.exports = validators;
