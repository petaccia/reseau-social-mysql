const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const router = require("./router");

const app = express();

// utiliser certains middlewares au niveau de l'application
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

// Servir le dossier public pour les ressources publiques
app.use(express.static(path.join(__dirname, "../public")));

// Servir l'application REACT APP
app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

// API routes
app.use(router);

// Redirigez toutes les demandes vers l'application REACT
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

// Exporter app
module.exports = app;
