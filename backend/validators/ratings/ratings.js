const Joi = require("joi");
const { validate } = require("node-cron");
const constants = require("../../constants/en");
const validators = {
  ratingsValid: async (data) => {
    var response = {
      validate: false,
    };
    const schema = Joi.object().keys({
      teacherId: Joi.number().required(),
      points: Joi.valid("1", "2", "3", "4", "5").required(),
    });
    const validator = schema.validate(data, {
      errors: { wrap: { label: "" } },
    });

    if (validator.error) {
      const { details } = validator.error;
      const message = details.map((i) => i.message).join(",");
      response.message = message;
      response.status = constants.NOT_FOUND_STATUS_CODE;
      return response;
    }
    response.validate = true;

    return response;
  },

  Valid: async (data) => {
    var response = {
      validate: false,
    };
    const schema = Joi.object().keys({
      teacherId: Joi.number().required(),
    });
    const validator = schema.validate(data, {
      errors: { wrap: { label: "" } },
    });

    if (validator.error) {
      const { details } = validator.error;
      const message = details.map((i) => i.message).join(",");
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
