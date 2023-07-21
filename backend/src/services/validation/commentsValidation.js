const Joi = require("joi");

const commentsValidation = (data) => {
  const commentSchema = Joi.object({
    content: Joi.string().min(3).presence("required"),
    userId: Joi.number().integer().min(1).presence("required"),
    postId: Joi.number().integer().min(1).presence("required"),
  });
  return commentSchema.validate(data, { abortEarly: false }).error;
};

module.exports = commentsValidation;
