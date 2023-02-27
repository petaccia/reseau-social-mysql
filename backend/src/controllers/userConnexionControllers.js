const cryptojs = require("crypto-js");
const bcrypt = require("bcrypt");
const models = require("../models");



const loginUser = async (req, res) => {
  console.log(req.body.email);
  console.log(req.body.password);

  
  const emailCryptos = cryptojs
    .HmacSHA256(req.body.email, `${process.env.DB_KEY_SECRET}`)
    .toString();
     console.log(emailCryptos);
      const email = emailCryptos 
     
      models.connexion
       .findByEmail(email)
       .then(([result]) => {
        console.log(result);
        res.status(200).send({ message : "utilisateur présent dans la base de donnée", result});
      })
      .catch ((err) => {
        console.error(err);
        res.sendStatus(500);
      })
    }

    
// // Enregistrer un nouvel utilisateur dans la base de donnée
const signUp = async (req, res) => {
  const {email , password} = req.body;
  const emailCryptos = cryptojs
    .HmacSHA256(email, `${process.env.DB_KEY_SECRET}`)
    .toString();   
    bcrypt
    .hash(password, 10)
    .then((hash) => {
        const connexion = {
          email: emailCryptos,
          password: hash
        };
       models.connexion
        .insert(connexion)
        .then(([result]) => {
          res.status(201).json({ message: "Utilisateur créé avec succès", result });
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        })
    })
  }
module.exports = { signUp, loginUser };
