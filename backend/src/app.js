const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const cookie = require("cookie-parser");
const router = require("./routes/route");

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

// Serve the public folder for public resources
app.use(express.static(path.join(__dirname, "../public")));

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
