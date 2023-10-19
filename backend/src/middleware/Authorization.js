const User = require('../models/User');
const AuthorizeFamilyAccess = async (req, res, next) => {
  try {
    // Vérifier si l'utilisateur est l'administrateur de la famille
    if (req.user.userType === 'adminFamily') {
      console.log("req.user.userType", req.user.userType);
      // Récupérez l'ID de la famille de l'administrateur de la famille
      const adminFamilyFamilyId = req.user.familyId;

      // Récupérez l'ID de la famille de l'utilisateur spécifié par userId
      const userId = req.params.userId;
      console.log('userId', userId);
      const user = await User.findOne({ where: { id: userId } });
      console.log('user', user);
      const userFamilyId = user.familyId;
      console.log('userFamilyId', userFamilyId);

      // Vérifiez si l'administrateur de la famille a le droit d'accéder aux utilisateurs de cette famille
      if (adminFamilyFamilyId === userFamilyId) {
        // Si c'est le cas, autorisez l'accès
        return next();
      } else {
        // Sinon, interdisez l'accès
        return res.status(403).json({ message: 'Accès interdit' });
      }
    } else {
      // Si l'utilisateur n'est pas un administrateur de la famille, interdisez l'accès
      return res.status(403).json({ message: 'Accès interdit' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erreur de token", error: err });
  }
};

module.exports = {
  AuthorizeFamilyAccess
}