const {DataTypes} = require("sequelize");
const db = require("../databaseSequelize");

const User = require("./User");
const Family = require("./Family");
const Admin = require("./Admin");
const Role = require("./Role");


const Connection = db.define("connections", {
  id : {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email : {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  creatorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  familyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  } ,
  adminId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Connection.belongsTo(User, {foreignKey: "userId"});
Connection.belongsTo(User, {foreignKey: "creatorId"});
Connection.belongsTo(Family, {foreignKey: "familyId"});
Connection.belongsTo(Admin, {foreignKey: "adminId"});
Connection.belongsTo(Role, {foreignKey: "roleId"});
module.exports = Connection;