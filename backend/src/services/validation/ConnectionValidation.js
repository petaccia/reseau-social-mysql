const Joi = require('joi');

const RegisterValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    });
    return schema.validate(data , { abortEarly: false });
};


const LoginValidation = (data) => {     
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    });
    return schema.validate(data , { abortEarly: false });
};

module.exports = { RegisterValidation, LoginValidation };
