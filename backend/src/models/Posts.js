const {DataTypes} = require("sequelize");
const db = require("../../databaseSequelize");

const User = require("./User");

const Post = db.define("posts", {
  id : {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imgUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

});

Post.belongsTo(User, { foreignKey: "userid" });

module.exports = Post;