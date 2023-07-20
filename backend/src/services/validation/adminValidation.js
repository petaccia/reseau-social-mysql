const Joi = require('joi');

const adminValidation = (data) => {
const adminSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).presence("required"),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'fr', 'net'] } }).presence("required"),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).presence("required"),
});
return adminSchema.validate(data, {abortEarly: false}).error;
};
module.exports = adminValidation;