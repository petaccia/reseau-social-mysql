const jwt = require("jsonwebtoken");
const AdminFamily = require("../models/AdminFamily");
const User = require("../models/User");

// Middleware authentication
const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Entête d'autorisation manquante" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "il manque le token" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.DB_ACCESS_TOKEN_SECRET);
    req.user = decodedToken;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Token non valide ou expiré" });
  }
};

// middleware pour le role requis pour la permission
const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).json({ message: "Accès refusé" });
    }
  };
};

const checkUserStatus = (req, res, next) => {
  const model = req.user.role === "adminFamily" ? AdminFamily : User;
  model
    .findOne({ where: { id: req.user.id } })
    .then((user) => {
      if (!user) {
        res.status(403).json({ message: "Accès refusé" });
      } else if (user.status !== "accepté") {
        res
          .status(401)
          .json({ message: "Votre compte est en attente de validation" });
      }
      next();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Erreur du serveur" });
    });
};

module.exports = { authenticateJWT, requireRole, checkUserStatus };
