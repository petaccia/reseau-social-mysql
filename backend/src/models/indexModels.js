const User = require("./User");
const AdminFamily = require("./AdminFamily");
const Role = require("./Roles");
const Family = require("./Family");

// ----------------------- ------------------------------User ------------------------------------------//

// Un utilisateur appartient à une seule famille
User.belongsTo(Family);

// Un utilisateur appartient à un rôle
User.belongsTo(Role);

// Un utilisateur appartient à un adminFamily
User.belongsTo(AdminFamily);

// --------------------------------------------------- AdminFamily-----------------------------------------//

// Un adminFamily appartient à une seule famille
AdminFamily.belongsTo(Family);

// Un AdminFamily peut avoir plusieurs utilisateurs
AdminFamily.hasMany(User);

// Un AdminFamily peut avoir plusieurs rôles
AdminFamily.hasMany(Role);

// -------------------------------------------------------- Rôle--------------------------------------------------------//

// Un rôle peut avoir plusieurs utilisateurs
Role.hasMany(User);

// -------------------------------------------------------- Family-----------------------------------------------------------//

// Une famille peut avoir plusieurs utilisateurs
Family.hasMany(User);

// Une famille peut avoir plusieurs adminFamily
Family.hasMany(AdminFamily);

module.exports = {
  User,
  AdminFamily,
  Role,
  Family,
}