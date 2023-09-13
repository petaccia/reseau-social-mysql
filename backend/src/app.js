const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const cookie = require("cookie-parser");


const router = require("./routes");

const Db = require("../databaseSequelize");

Db.sync({ alter: true })
  .then(console.error("Connexion à la base de données"))
  .catch((err) => console.error(err));

const app = express();
app.use(cookie());
// use some application-level middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.json());

// Serve the public folder for public resources
app.use(express.static(path.join(__dirname, "../public")));

// uploader file dans reseau social mysql
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


// Serve REACT APP
app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

// API routes
app.use(router);

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
