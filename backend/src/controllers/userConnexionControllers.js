const cryptojs = require("crypto-js");
const bcrypt = require("bcrypt");
const models = require("../models");



const loginUser = async (req, res) => {
  
  const emailCrypto = cryptojs
    .HmacSHA256(req.body.email, `${process.env.DB_KEY_SECRET}`)
    .toString();
  
  try {
    const [result] = await models.connexion.findByEmail(emailCrypto);
    if ( result == 0 ) {
      res.status(404).send({ message: "Utilisateur introuvable" });
    } else {
      const passwordMatch = await bcrypt.compare(req.body.password, result[0].password);
      if (passwordMatch) {
        res.status(200).send({ message: "Utilisateur présent dans la base de données", result });
      } else {
        res.status(404).send({ message: "Mot de passe incorrect" });
      }
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

    
// Enregistrer un nouvel utilisateur dans la base de donnée
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
