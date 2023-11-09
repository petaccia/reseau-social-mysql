const Joi = require("joi");

const familyValidation = (data) => {
  const familySchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).presence("required"),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .presence("required"),
    familyPicture: Joi.string().allow(null, ""),
  });
  return familySchema.validate(data, { abortEarly: false }).error;
};

module.exports = familyValidation;
