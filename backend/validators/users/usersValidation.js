const Joi = require("joi");

module.exports.userValidation = (req, res, next) => {
  const validateUser = (user) => {
    const JoiSchema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      firstName: Joi.string().min(3).max(30).required(),
      lastName: Joi.string().min(3).max(30).required(),
      number: Joi.string().min(10).max(10).required(),
      Password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
        .message("Password atleast 6 character long")
        .required(),
      gender: Joi.string().valid("male", "female").required(),
      dob: Joi.date().required(),
      address: Joi.string().optional(),
    });
    return JoiSchema.validate(user);
  };
  const response = validateUser(req.body);
  if (response.error) {
    const msg = response.error.details[0].message;
    return res.status(422).json({ statusCode: 422, message: msg });
  } else {
    next();
  }
};

module.exports.userLoginVal = (req, res, next) => {
  const validateUser = (user) => {
    const JoiSchema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
        .message("Password atleast 6 character long")
        .required(),
    });
    return JoiSchema.validate(user);
  };
  const response = validateUser(req.body);
  if (response.error) {
    const msg = response.error.details[0].message;
    return res.status(422).json({ statusCode: 422, message: msg });
  } else {
    next();
  }
};

module.exports.updatePassword = (req, res, next) => {
  const validateUser = (user) => {
    const JoiSchema = Joi.object({
      oldPassword: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
        .message("Password atleast 6 character long")
        .required(),
      newPassword: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
        .message("Password atleast 6 character long")
        .required(),
      confirmPassword: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
        .message("Password atleast 6 character long")
        .required(),
    });
    return JoiSchema.validate(user);
  };
  const response = validateUser(req.body);
  if (response.error) {
    const msg = response.error.details[0].message;
    return res.status(422).json({ statusCode: 422, message: msg });
  } else {
    next();
  }
};

module.exports.forgetPassword = (req, res, next) => {
  const validateUser = (user) => {
    const JoiSchema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
    });
    return JoiSchema.validate(user);
  };
  const response = validateUser(req.body);
  if (response.error) {
    const msg = response.error.details[0].message;
    return res.status(422).json({ statusCode: 422, message: msg });
  } else {
    next();
  }
};

module.exports.resetPassword = (req, res, next) => {
  const validateUser = (user) => {
    const JoiSchema = Joi.object({
      otp: Joi.string().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
        .message("Password atleast 6 character long")
        .required(),
    });
    return JoiSchema.validate(user);
  };
  const response = validateUser(req.body);
  if (response.error) {
    const msg = response.error.details[0].message;
    return res.status(422).json({ statusCode: 422, message: msg });
  } else {
    next();
  }
};

module.exports.userUpdateValidation = (req, res, next) => {
  const validateUser = (user) => {
    const JoiSchema = Joi.object({
      emailId: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .optional(),
    number: Joi.string().min(10).max(10).optional(),
    dob: Joi.date().optional(),
    subject: Joi.string().optional(),
    address: Joi.string().optional(),
  });
    return JoiSchema.validate(user,{ errors: { wrap: { label: "" } } });
  };
  const response = validateUser(req.body);
  if (response.error) {
    const msg = response.error.details[0].message;
    return res.status(422).json({ statusCode: 422, message: msg });
  } else {
    next();
  }
};
