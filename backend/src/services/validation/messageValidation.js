const Joi = require("joi");

const messageValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    senderId: Joi.number().required(),
    receiverId: Joi.number().required(),
    status: Joi.boolean().optional(),
    statusRead: Joi.string().valid("sent", "delivered", "read").optional(),
  });
  return schema.validate(data, { abortEarly: false }).error;
};

module.exports = {
  messageValidation,
};
