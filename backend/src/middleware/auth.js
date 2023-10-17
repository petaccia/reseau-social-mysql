const jwt = require("jsonwebtoken");
const AdminFamily = require("../models/AdminFamily");
const User = require("../models/User");

// Middleware d'authentification
const authenticateJWT = async (req, res, next) => {
  const { token } = req.cookies;
  console.log("Token dans authenticateJWT : ", token);
  if (!token) {
    return res.status(401).json({ message: "Pas de token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.userType === "adminFamily") {
      const adminFamily = await AdminFamily.findOne({ where: { id: decoded.id }} );
      if (!adminFamily) {
        return res.status(401).json({ message: "AdminFamily introuvable" });
      }
      req.user = adminFamily;
    } else if (decoded.userType === "user") {
      const user = await User.findOne({ where: { id: decoded.id }});
      if (!user) {
        return res.status(401).json({ message: "User introuvable" });
      }
      req.user = user;
    }

    console.log("req.user", req.user);
    console.log("decoded", decoded);
    next();
  } catch (err) {
    console.error(err);
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expiré" });
    }
    return res.status(500).json({ message: "Erreur de token", error: err });
  }
};

const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user) {
      if ((role === "adminFamily" && req.user.roleId === 1) || (role === "user" && req.user.roleId === 3)) {
        return next();
      } else {
        return res.status(403).json({ message: "Pas autorisé" });
      }
    } else {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }
  };
};


module.exports = {
  authenticateJWT,
  requireRole,
}