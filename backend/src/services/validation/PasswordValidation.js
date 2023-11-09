const Joi = require("joi");

// Vérification du password
const PasswordValidation = (data) => {
  const schema = Joi.object({
    userId: Joi.number().required(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data, { abortEarly: false });
};
module.exports = { PasswordValidation };
