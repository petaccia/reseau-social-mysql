const User = require("./User");
const AdminFamily = require("./AdminFamily");
const Family = require("./Family");
const Role = require("./Roles");

// ----------------------- ------------------------------User ------------------------------------------//

// Un utilisateur appartient à une seule famille

// --------------------------------------------------- AdminFamily-----------------------------------------//

// Un adminFamily appartient à une seule famille
AdminFamily.belongsTo(Family);

// Un AdminFamily peut avoir plusieurs utilisateurs
AdminFamily.hasMany(User);

// Un AdminFamily peut avoir plusieurs rôles
AdminFamily.belongsTo(Role);


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
};
