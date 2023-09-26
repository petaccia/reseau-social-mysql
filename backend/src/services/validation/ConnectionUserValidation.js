const Joi = require("joi");

const RegisterValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).alphanum().required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "fr", "net"] },
      })
      .required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9!#$%&'*+]+$/)
      .min(8)
      .required(),
  });
  return schema.validate(data, { abortEarly: false });
};

const LoginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data, { abortEarly: false });
};


module.exports = { RegisterValidation, LoginValidation };
