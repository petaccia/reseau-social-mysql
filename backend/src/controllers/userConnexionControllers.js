const cryptojs = require("crypto-js");
const bcrypt = require ("bcrypt");

const models = require("../models");

// Enregistrer un nouvel utilisateur dans la base de donnée
const signUp = (req, res) => {
  const {email , password} = req.body;
 
  // chiffrer l'email avant de l'envoyer dans la base de donnée
  const emailCryptoJs = cryptojs
   .HmacSHA256(email, `${process.env.DB_KEY_SECRET}`)
   .toString();
 // hacher le mot de passe avant de l'envoyer dans la base de donnée
  bcrypt
  .hash(password, 10)
  .then((hash) => {
    //les données que vais envoyer
    const user = {
      email: emailCryptoJs,
      password: hash  
    };
    models.connexion
    .insert(user)
    .then(([result]) => {
      res.status(201).json({ message: 'Utilisateur enregistré avec succès' });    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  });
};

module.exports = {signUp}