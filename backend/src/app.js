const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const cookie = require("cookie-parser");
const morgan = require("morgan");
// const pusher = require("pusher"); // Ajoutez cette ligne pour importer Pusher

const router = require("./routes");

const Db = require("../databaseSequelize");

Db.sync({ alter: true })
  .then(() => {
    console.log("Connexion à la base de données réussie");
  })
  .catch((err) => console.error(err));

const app = express();

app.use(morgan("dev"));
app.use(cookie());
// Utilisez quelques middlewares au niveau de l'application
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.json());

// Servez le dossier public pour les ressources publiques
app.use(express.static(path.join(__dirname, "../public")));

// Uploadez des fichiers dans le réseau social MySQL
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Servez l'application REACT
app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

// API routes
app.use(router);

// Redirigez toutes les requêtes vers l'application REACT
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

module.exports = app;
