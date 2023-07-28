const Joi = require("joi");

const validateEvent = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.date().required(),
    familyId: Joi.number().required(),
  });
  return schema.validate(data, { abortEarly: false });
};


module.exports = validateEvent;
