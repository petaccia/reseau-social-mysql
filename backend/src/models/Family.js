const {DataTypes} = require("sequelize");
const db = require("../databaseSequelize");

const Family = db.define("families", {
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
  familypicture: {
    type: DataTypes.STRING,
    allowNull: false, 
  },

});

module.exports = Family;