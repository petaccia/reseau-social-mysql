const {DataTypes} = require("sequelize");
const db = require("../databaseSequelize");

const Creator = db.define("creators", {
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
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isSuperAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  } ,
});

module.exports = Creator;

  
})
