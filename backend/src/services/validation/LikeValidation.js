const Joi = require('joi');

const likeValidation = (data) => {
    const likeSchema = Joi.object({
        userId: Joi.number().integer().required(),
        postId: Joi.number().integer().required(),
    });
    return likeSchema.validate(data , { abortEarly: false });
};

module.exports = likeValidation;