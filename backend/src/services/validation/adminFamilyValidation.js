const Joi = require("joi");

const adminFamilyValidation = (data) => {
  const adminFamilySchema = Joi.object({
    familyId: Joi.number().integer().presence("required"),
    adminId: Joi.number().integer().presence("required"),
  });
  return adminFamilySchema.validate(data, { abortEarly: false }).error;
};

module.exports = adminFamilyValidation;
