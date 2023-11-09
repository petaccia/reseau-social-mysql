const Joi = require("joi");

const EmailValidation = (data) => {
  const schema = Joi.object({
    userId: Joi.number().required(),
    email: Joi.string().email().required(),
    pass: Joi.string().min(8).required(),
  });
  return schema.validate(data, { abortEarly: false });
};

module.exports = {
  EmailValidation,
};
