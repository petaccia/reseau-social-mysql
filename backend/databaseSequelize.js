const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT

  }
);

sequelize.authenticate().then(() => {
  console.log("Connexion à la base de données réussie");
}).catch((err) => {
  console.log("Connexion à la base de données échouée", err);
});


module.exports = sequelize
