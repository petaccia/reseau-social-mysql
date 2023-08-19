const Joi = require("joi");

const messageValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    sender: Joi.number().required(),
    receiver: Joi.number().required(),
    status: Joi.boolean().required(),
  });
  return schema.validate(data, { abortEarly: false }).error;
};

module.exports = {
  messageValidation,
};
