const { DataTypes } = require("sequelize");
const db = require("../../databaseSequelize");

const Role = db.define("roles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  roleDescription: {
    type: DataTypes.ENUM("admin", "creator", "user"),
    allowNull: false,
  },
});

module.exports = Role;
