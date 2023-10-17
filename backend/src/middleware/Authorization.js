const authorizeFamilyAccess = (req, res, next) => {
  // Vérifier si l'utilisateur est un adminFamily de la famille
  if (req.user.userType === 'adminFamily') {
    // Vérifier si l'identifiant de la famille de l'adminFamily correspond à celui de utilisateur cible
    if (req.user.familyId === req.params.userId) {
      // Si c'est le cas, autoriser l'acces
      return next()
    } else {
      // Sinon, interdire l'acces
      return res.status(403).json({ message: 'Accès interdit' });
    }
  } else {
    // Sinon, si l'utilisateur n'est pas un adminFamily, interdire l'acces
    return res.status(403).json({ message: 'Accès interdit' });
  }  
};

module.exports = 
  authorizeFamilyAccess;