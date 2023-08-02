const Joi = require("joi");

const messageValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    sender: Joi.string().required(),
    receiver: Joi.string().required(),
    status: Joi.string().required(),
  });
  return schema.validate(data, { abortEarly: false }).error;
};

module.exports = {
  messageValidation,
};
