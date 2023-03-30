const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    if (typeof password === 'string') {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } else {
      throw new Error('password must be a string');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const comparePassword = async (password, hashedPassword) => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};

module.exports = { hashPassword, comparePassword };