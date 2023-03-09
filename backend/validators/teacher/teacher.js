const Joi = require("joi");

module.exports.attendanceValidation = (req, res, next) => {
  const validateUser = (user) => {
    const JoiSchema = Joi.object({
      enrollmentNo: Joi.number().required(),
      status: Joi.string().valid("present", "absent").required(),
    });
    return JoiSchema.validate(user, { errors: { wrap: { label: "" } } });
  };
  const response = validateUser(req.body);
  if (response.error) {
    const msg = response.error.details[0].message;
    return res.status(422).json({ statusCode: 422, message: msg });
  } else {
    next();
  }
};

module.exports.teacherAttendanceValidation = (req, res, next) => {
  const validateUser = (user) => {
    const JoiSchema = Joi.object({
      status: Joi.string().valid("present", "absent").required(),
    });
    return JoiSchema.validate(user, { errors: { wrap: { label: "" } } });
  };
  const response = validateUser(req.body);
  if (response.error) {
    const msg = response.error.details[0].message;
    return res.status(422).json({ statusCode: 422, message: msg });
  } else {
    next();
  }
};

module.exports.showAttendanceValidation = (req, res, next) => {
  const validateUser = (user) => {
    const JoiSchema = Joi.object({
      month: Joi.string().required(),
      year: Joi.string().required(),
    });
    return JoiSchema.validate(user);
  };
  const response = validateUser(req.query);
  if (response.error) {
    const msg = response.error.details[0].message;
    return res.status(422).json({ statusCode: 422, message: msg });
  } else {
    next();
  }
};


