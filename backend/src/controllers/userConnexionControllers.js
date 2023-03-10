const cryptojs = require("crypto-js");
const models = require("../models");
const { comparePassword, hashPassword } = require("../services/bcrypt");
const { generateToken } = require("../services/jsonWebToken");



const loginUser = async (req, res) => {
  
  const emailCrypto = cryptojs
    .HmacSHA256(req.body.email, `${process.env.DB_KEY_SECRET}`)
    .toString();
  
  try {
    const [result] = await models.connexion.findByEmail(emailCrypto);
    if ( result == 0 ) {
      res
      .status(404)
      .send({ message: "Utilisateur introuvable" });
   
    } else {
      const passwordMatch = await comparePassword(
        req.body.password, 
        result[0].password
        );
      
        if (passwordMatch) {
        const token = generateToken(result);
        res
        .status(200)
        .send({ message: "Utilisateur présent dans la base de données", result, token });
      } else {
        res
        .status(404)
        .send({ message: "Mot de passe incorrect" });
      }
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

    
// Enregistrer un nouvel utilisateur dans la base de donnée
const signUp = async (req, res) => {
  const emailCrypto = cryptojs
    .HmacSHA256(req.body.email, `${process.env.DB_KEY_SECRET}`)
    .toString();

  try {
    const [existingUser] = await models.connexion.findByEmail(emailCrypto);
    // console.log("existingUser", existingUser);
    
    
    if (existingUser && existingUser.length > 0 && existingUser[0].email === emailCrypto) {
      res.status(409).send({ message: "Cet utilisateur existe déjà" });
    } else {
      const hashedPassword = await hashPassword(req.body.password);
      const newUser = await models.connexion.insert({
        email: emailCrypto,
        password: hashedPassword,
      });
      res.status(201).send({ message: "Utilisateur créé avec succès", newUser });
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = { signUp, loginUser };
