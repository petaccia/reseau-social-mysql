const { DataTypes } = require("sequelize");
const db = require("../databaseSequelize");
const User = require("./User");
const Post = require("./Posts");

const Comments = db.define("comments", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Comments.belongsTo(User, { foreignKey: "userId" });
Comments.belongsTo(Post, { foreignKey: "postId" });

module.exports = Comments;
