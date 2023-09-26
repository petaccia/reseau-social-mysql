const jwt = require("jsonwebtoken");

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
    req.user = decodedToken.user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Token non valide ou expirer" });
  }
};

// middleware pour le role requis pour  la permission
const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).json({ message: "Accès refusé" });
    }
  };
};
module.exports = { authenticateJWT, requireRole };
