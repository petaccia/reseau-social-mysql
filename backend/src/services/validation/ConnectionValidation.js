const Joi = require("joi");

const RegisterValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data, { abortEarly: false });
};

const LoginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data, { abortEarly: false });
};

const testData = {
  username: "testuser",
  email: "test@example.com",
  password: "Test1234!"
}

console.log(RegisterValidation(testData));

module.exports = { RegisterValidation, LoginValidation };
