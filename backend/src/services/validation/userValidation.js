const Joi = require('joi');

const userValidation = (data) => {
const userSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).presence("required"),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'fr', 'net'] } }).presence("required"),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).presence("required"),
    firstName: Joi.string().alphanum().min(3).max(30).presence("required"),
    lastName: Joi.string().alphanum().min(3).max(30).presence("required"),
    dateOfBirth: Joi.date().presence("required"),
    profilePicture: Joi.string().allow(null, ''),
    familyId: Joi.number().integer().presence("required"),
});
return userSchema.validate(data, {abortEarly: false}).error;
};
module.exports = userValidation;