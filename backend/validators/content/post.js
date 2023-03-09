const Joi = require("joi");
const { validate } = require("node-cron");
const constants = require("../../constants/en");
const validators = {
  create_Post: async (data) => {
    var response = {
      validate: false,
    };
    const schema = Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      Image: Joi.string().optional(),
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

  like_Post: async (data) => {
    var response = {
      validate: false,
    };
    const schema = Joi.object().keys({
      PostId: Joi.number().required(),
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

  Post_comment: async (data) => {
    var response = {
      validate: false,
    };
    const schema = Joi.object().keys({
      PostId: Joi.number().required(),
      comment: Joi.string().required(),
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

  delete_comment: async (data) => {
    var response = {
      validate: false,
    };
    const schema = Joi.object().keys({
      PostId: Joi.number().required(),
      commentId: Joi.string().required(),
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
module.exports = validators;
