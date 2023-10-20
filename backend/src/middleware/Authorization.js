const AdminFamily = require("../models/AdminFamily");
const User = require("../models/User");

const authorizeFamilyAccess = async (req, res, next) => {
  try {
    const userId = req.params.userId; // Récupérer le paramètre userId de la requête
    const adminFamilyId = req.params.adminFamily; // Récupérer le paramètre adminFamilyId de la requête

    console.log("User ID:", userId);
    console.log("AdminFamily ID:", adminFamilyId);

    // Récupérer l'administrateur de famille actuellement connecté
    const currentAdminFamily = req.user;

    // Vérifier s'il s'agit d'un utilisateur
    if (userId) {
      // Rechercher l'utilisateur cible dans la base de données
      const targetUser = await User.findByPk(userId);
      console.log("Target user ID:", userId);

      if (!targetUser) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      // Vérifier si l'administrateur de famille actuel appartient à la même famille que l'utilisateur cible
      if (currentAdminFamily.familyId === targetUser.familyId) {
        console.log("Current adminFamily ID:", currentAdminFamily.id);
        // Si c'est le cas, autoriser l'accès
        next();
      } else {
        // Sinon, interdire l'accès
        res.status(403).json({ message: 'Accès interdit', reason: "L'administrateur de famille ne fait pas partie de la même famille que l'utilisateur" });
      }
    }

    // Vérifier s'il s'agit d'un administrateur de famille
    if (adminFamilyId) {
      // Rechercher l'administrateur de famille cible dans la base de données
      const targetAdminFamily = await AdminFamily.findByPk(adminFamilyId);
      console.log("Target adminFamily ID:", adminFamilyId);

      if (!targetAdminFamily) {
        return res.status(404).json({ message: 'Administrateur de famille non trouvé' });
      }

      // Vérifier si l'administrateur de famille actuel appartient à la même famille que l'administrateur cible
      if (currentAdminFamily.familyId === targetAdminFamily.familyId) {
        console.log("Current adminFamily ID:", currentAdminFamily.id);
        // Si c'est le cas, autoriser l'accès
        next();
      } else {
        // Sinon, interdire l'accès
        res.status(403).json({ message: 'Accès interdit', reason: "L'administrateur de famille ne fait pas partie de la même famille que l'administrateur cible" });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur de token', error: err });
  }
};

module.exports = {
  authorizeFamilyAccess
}
