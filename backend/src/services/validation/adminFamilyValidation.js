const Joi = require("joi");

const adminFamilyValidation = (data) => {
  const Schema = Joi.object({
    firstname: Joi.string().alphanum().min(3).max(30).required(),
    lastname: Joi.string().alphanum().min(3).max(30).optional(),
    dateOfBirth: Joi.date().optional(),
    numberPhone: Joi.string().required(),
    adress: Joi.string().required(),
    city: Joi.string().required(),
    postalCode: Joi.string().required(),
    country: Joi.string().required(),
  });
  const { error } = Schema.validate(data, { abortEarly: false });
  if (error) {
    console.log("Erreurs de validation des données", error.details);
  }
  return error;
};

module.exports = adminFamilyValidation;