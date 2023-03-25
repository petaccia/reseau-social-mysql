const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.DB_JWT_SECRET, {
    expiresIn: "12h",
  });
  return token;
};

module.exports = {
  generateToken
};