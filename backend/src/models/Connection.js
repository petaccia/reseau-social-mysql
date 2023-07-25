const { DataTypes } = require("sequelize");
const db = require("../../databaseSequelize");

const User = require("./User");
const Family = require("./Family");
const Admin = require("./Admin");
const Role = require("./Roles");
const Creator = require("./Creator");

const Connection = db.define("connections", {
  id: {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  creatorId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  familyId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  adminId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

Connection.belongsTo(User, { foreignKey: "userId" });
Connection.belongsTo(Creator, { foreignKey: "creatorId" });
Connection.belongsTo(Family, { foreignKey: "familyId" });
Connection.belongsTo(Admin, { foreignKey: "adminId" });
Connection.belongsTo(Role, { foreignKey: "roleId" });
module.exports = Connection;
