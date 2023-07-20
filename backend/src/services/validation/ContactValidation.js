const Joi = require('joi');

const contactValidation = (data) => {
  const schema = Joi.object({
    firstname: Joi.string().min(3).max(45).required(),
    email: Joi.string().email().required(),
    message: Joi.string().min(3).max(255).required(),
  
  });
  return schema.validate(data, { abortEarly: false }).error;

};

module.exports = contactValidation;