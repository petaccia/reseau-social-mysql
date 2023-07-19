const rateLimit = require("express-rate-limit");

const LoginLimiter = rateLimit({
    windowMs: 5 *60 * 1000, // 5 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: "Too many login attempts from this IP, please try again after 15 minutes"
});

module.exports = LoginLimiter;