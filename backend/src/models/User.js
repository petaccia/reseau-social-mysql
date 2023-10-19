const { DataTypes } = require("sequelize");
const db = require("../../databaseSequelize");

const AdminFamily = require("./AdminFamily");
const Family = require("./Family");
const Roles = require("./Roles");

const User = db.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    numberPhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    adress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postalCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("en attente", "accepté", "refusé"),
      allowNull: true,
    },
    familyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Family,
        key: "id",
      },
    },
    adminFamilyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: AdminFamily,
        key: "id",
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Roles",
        key: "id",
      },
    }
  },
  {
    timestamps: false,
  }
);
// Plusieurs user appartient à une seule famille
Family.hasMany(User, { foreignKey:  "familyId"} );
// Plusieurs user appartient à une seule adminFamily
AdminFamily.hasMany(User, { foreignKey: "adminFamilyId"} );
// Plusieurs user appartient à un seul role
User.belongsTo(Roles, { foreignKey: "roleId"} );
module.exports = User;
