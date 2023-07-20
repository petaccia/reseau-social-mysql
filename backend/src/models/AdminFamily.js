const {DataTypes} = require("sequelize");
const db = require("../../databaseSequelize");
const Admin = require("./Admin");
const Family = require("./Family");

const AdminFamily = db.define("adminFamily", {
  id : {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  familyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
 },
 adminId: {
  type: DataTypes.INTEGER,
  allowNull: false
 }

});

AdminFamily.belongsTo(Admin,{foreignKey: "adminId"});
AdminFamily.belongsTo(Family,{foreignKey: "familyId"});

module.exports = AdminFamily;
