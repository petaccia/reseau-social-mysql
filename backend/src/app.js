const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const cookie = require("cookie-parser");

//importer mes routes du dossier routes
const AdminRoute = require("./routes/admin.js");
const AdminFamilyRoute = require("./routes/adminFamily.js");
const CommentRoute = require("./routes/comment.js");
const ConnectionRoute = require("./routes/connection.js");
const ContactRoute = require("./routes/contact.js");
const CreatorRoute = require("./routes/creator.js");
const FamilyRoute = require("./routes/family.js");
const LikeRoute = require("./routes/like.js");
const PostRoute = require("./routes/post.js");
const RoleRoute = require("./routes/role.js");
const UserRoute = require("./routes/user.js");

const Db = require("../databaseSequelize");

Db.sync({ force: true })
  .then(console.log("Connexion à la base de données"))
  .catch((err) => 
    console.log(err));
    


const app = express();
app.use(cookie());
// use some application-level middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
    redentials: true,
  })
);

app.use(express.json());

// Routes
app.use ("/admin", AdminRoute);
app.use ("/adminFamily", AdminFamilyRoute);
app.use ("/comment", CommentRoute);
app.use ("/connection", ConnectionRoute);
app.use ("/contact", ContactRoute);
app.use ("/creator", CreatorRoute);
app.use ("/family", FamilyRoute);
app.use ("/like", LikeRoute);
app.use ("/post", PostRoute);
app.use ("/role", RoleRoute);
app.use ("/user", UserRoute);

// Serve the public folder for public resources
app.use(express.static(path.join(__dirname, "../public")));

// Serve REACT APP
app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

// API routes
app.use(routes);

// Redirect all requests to the REACT app
const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

// ready to export
module.exports = app;
