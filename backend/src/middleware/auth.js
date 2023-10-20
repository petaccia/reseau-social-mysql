const jwt = require("jsonwebtoken");
const AdminFamily = require("../models/AdminFamily");
const User = require("../models/User");

// Middleware d'authentification
const authenticateJWT = async (req, res, next) => {
  const { token } = req.cookies;
  console.log("Token:", token); // Log du token
  if (!token) {
    return res.status(401).json({ message: "Pas de token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Log du token décodé
    console.log("decoded", decoded);
    if (decoded.userType === "adminFamily") {

      const adminFamily = await AdminFamily.findOne({ where: { id: decoded.id }} );
      if (!adminFamily) {
        return res.status(401).json({ message: "AdminFamily introuvable" });
      }
      req.user = adminFamily;
      req.user.userType = "adminFamily";
    } else if (decoded.userType === "user") {
      const user = await User.findOne({ where: { id: decoded.id }});
      if (!user) {
        return res.status(401).json({ message: "User introuvable" });
      }
      req.user = user;
      req.user.userType = "user";
      
    }

    next();
  } catch (err) {
    console.error(err);
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expiré" });
    }
    return res.status(500).json({ message: "Erreur de token", error: err });
  }
};

const requireAdminFamilyRole = () => {
  return (req, res, next) => {
    console.log("requireRole", req.user.userType);
    if (req.user) {
      if ( req.user.userType === "adminFamily" && req.user.roleId === 1) {
        return next();
      } else {
        return res.status(403).json({ message: "Pas autorisé", reason: "Role introuvable" });
      }
    } else {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }
  };
};


module.exports = {
  authenticateJWT,
  requireAdminFamilyRole,
}