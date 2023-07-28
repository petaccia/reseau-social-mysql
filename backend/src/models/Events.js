const { DataTypes } = require("sequelize");
const db = require("../../databaseSequelize");

const Family = require("./Family");

const Event = db.define("event", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  familyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Event.belongsTo(Family, { foreignKey: "familyId" });

module.exports = Event;
