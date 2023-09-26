const Joi = require("joi");

const AdminFamilyRegisterValidation = (data) => {
  const schema = Joi.object({
    familyName: Joi.string().min(3).max(50).required(),
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "fr", "net", "gmail"] },
      })
      .required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9!#$%&'*+]+$/)
      .min(8)
      .required(),
  });
  return schema.validate(data, { abortEarly: false });
};

const AdminFamilyLoginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data, { abortEarly: false });
};


module.exports = { AdminFamilyRegisterValidation, AdminFamilyLoginValidation };
