const Joi = require("joi");

const userValidation = (data) => {
  const schema = Joi.object({
    firstname: Joi.string().alphanum().min(3).max(30).required(),
    lastname: Joi.string().alphanum().min(3).max(30).allow(null, "").optional(),
    dateOfBirth: Joi.date().optional(),
    numberPhone: Joi.string().allow(null, "").optional(),
    adress: Joi.string().allow(null, "").optional(),
    city: Joi.string().allow(null, "").optional(),
    postalCode: Joi.string().allow(null, "").optional(),
    country: Joi.string().allow(null, "").optional(),
    profilePicture: Joi.string().allow(null, "").optional(),
  });

  return schema.validate(data, { abortEarly: false });
};
module.exports = userValidation;
