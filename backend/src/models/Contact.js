const { DataTypes } = require("sequelize");
const db = require("../../databaseSequelize");

const Contact = db.define("contacts", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Contact;
