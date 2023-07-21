const Joi = require("joi");

const validadateCreator = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(45).required(),
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
    isSuperAdmin: Joi.boolean().required(),
  });
  return schema.validate(data), { abortEarly: false };
};

module.exports.validadateCreator = validadateCreator;
