const { string } = require("joi");
const Joi = require("joi");
const { validate } = require("node-cron");
const { join } = require("path");
const constants = require("./../../constants/en");
const validators = {
  /**
   * signup
   
   */

  student: async (data, fees) => {
    var response = {
      validate: false,
    };
    const schema = Joi.object().keys({
      amount: Joi.number().min(1000).max(120000).required(),
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

  teacher: async (data) => {
    var response = {
      validate: false,
    };
    const schema = Joi.object().keys({
      amount: Joi.number().required(),
      teacherId: Joi.number().required(),
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
  create_PayId: async (data) => {
    var response = {
      validate: false,
    };
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.number().required(),
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
  Card: async (data) => {
    var response = {
      validate: false,
    };
    const schema = Joi.object().keys({
      card_number: Joi.string().required(),

      exp_year: Joi.number().required(),
      exp_month: Joi.number().required(),
      cvv_no: Joi.number().required(),
      name: Joi.string().required(),
      customer_id: Joi.string().required(),
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
  Pay: async (data) => {
    var response = {
      validate: false,
    };
    const schema = Joi.object().keys({
      productId: Joi.string().required(),
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
