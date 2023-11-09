const Joi = require("joi");

const validadateRole = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(45).required(),
    roleDescription: Joi.string().min(3).max(255).required(),
  });
  return schema.validate(data), { abortEarly: false };
};

module.exports.validadateRole = validadateRole;
