const { DataTypes } = require("sequelize");
const db = require("../../databaseSequelize");

const Roles = require("./Roles");

const AdminFamily = db.define("adminFamilies", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
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
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Roles,
      key: "id",
    },
  },
});

AdminFamily.belongsTo(Roles, { foreignKey: "roleId" });
module.exports = AdminFamily;
