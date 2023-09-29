const jwt = require("jsonwebtoken");
const AdminFamily = require("../models/AdminFamily");
const User = require("../models/User");

// Middleware authentication
const authenticateJWT = async (req, res, next) => {
  const { token } = req.cookies;
  console.log("token in authenticateJWT back", token);
  if (!token) {
    return res.status(401).json({ message: "Pas de token" });
  }

  try {
    // const secret = "3$dt&NE95bgtRRjhLs5yAMf54sP$c8$x8!@";
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.userType === "adminFamily") {
      req.user = await AdminFamily.findOne({ where: { id: decoded.id } });
    } else if (decoded.userType === "user") {
      req.user = await User.findOne({ where: { id: decoded.id } });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Token invalide" });
    }
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erreur de token", error: err });
  }
};
//  middleware pour le role requis pour la permission
const requireRole = (role) => {
  
  return (req, res, next) => {
    console.log("Inside requireRole middleware", req.user);
    console.log("Expected role:", role);
    console.log("Actual user role:", req.user ? req.user.roleId : "No user");
        if (req.user && (role === "adminfamily" ? req.user.roleId === 1 : true)) {
          console.log("Role check passed. Moving to next middleware.");
      return next();
    } else {
      console.log("Role check failed. Sending 403 response.");
      return res.status(403).json({ message: "Accès refusé" });
    } 
  };
};

// const checkUserStatus = (req, res, next) => {
//   console.log("Inside checkUserStatus middleware");  
//   const model = req.user.userType === "adminFamily" ? AdminFamily : User;
//   model
//     .findOne({ where: { id: req.user.id } })
//     .then((user) => {
//       if (!user) {
//         return res.status(404).json({ message: "Utilisateur introuvable" });
//       }
//       if (user.userType !== "accepté") {
//         return res
//           .status(401)
//           .json({ message: "Votre compte est en attente de validation" });
//         }
//         return next();
//     })
//     .catch((err) => {
//       return res.status(500).json({ message: "Erreur du serveur" });
//     });
// };

module.exports = 
{ 
  authenticateJWT,
  requireRole,
  //  checkUserStatus 
  };
