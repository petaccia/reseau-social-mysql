const Joi = require('joi');

const postValidation = (data) => {
    const postSchema = Joi.object({
        content: Joi.string().min(3).required(),
        imgUrl: Joi.string().min(3).required(),
        userId: Joi.number().integer().required(),
    });
    return postSchema.validate(data , { abortEarly: false });
};

module.exports = postValidation;