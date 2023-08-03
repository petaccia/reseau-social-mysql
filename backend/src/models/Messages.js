const { DataTypes } = require("sequelize");

const db = require("../../databaseSequelize");

const User = require("./User");

const Message = db.define("messages", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

Message.belongsTo(User, { foreignKey: "senderId" });
Message.belongsTo(User, { foreignKey: "receiverId" });

module.exports = Message;
