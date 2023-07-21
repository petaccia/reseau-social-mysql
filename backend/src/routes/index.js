const express = require("express");

const router = express.Router();

const AdminRoute = require("./admin.js");
const AdminFamilyRoute = require("./adminFamily.js");
const CommentRoute = require("./comment.js");
const ConnectionRoute = require("./connection.js");
const ContactRoute = require("./contact.js");
const CreatorRoute = require("./creator.js");
const FamilyRoute = require("./family.js");
const LikeRoute = require("./like.js");
const PostRoute = require("./post.js");
const RoleRoute = require("./role.js");
const UserRoute = require("./user.js");

// Routes
router.use("/admin", AdminRoute);
router.use("/adminFamily", AdminFamilyRoute);
router.use("/comment", CommentRoute);
router.use("/connection", ConnectionRoute);
router.use("/contact", ContactRoute);
router.use("/creator", CreatorRoute);
router.use("/family", FamilyRoute);
router.use("/like", LikeRoute);
router.use("/post", PostRoute);
router.use("/role", RoleRoute);
router.use("/user", UserRoute);

module.exports = router;
