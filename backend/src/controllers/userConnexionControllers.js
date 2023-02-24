const cryptojs = require("crypto-js");
const bcrypt = require ("bcrypt");


// Enregistrer un nouvel utilisateur dans la base de donnée
const signUp = (req, res) => {
  const {email , password} = req.body;
 
  // chiffrer l'email avant de l'envoyer dans la base de donnée
  const emailCryptoJs = cryptojs
   .HmacSHA256(email, `${process.env.DB_KEY_SECRET}`).toString();

   // hacher le mot de passe avant de l'envoyer dans la base de donnée
  bcrypt
  .hash(password, 10)
  .then((hash) => {

    // ce qui va être enregistré dans mysql


    //les données que vais envoyer
    const user = {
      email: emailCryptoJs,
      password: hash
    }
    console.log(user)
  })
  .catch((error) => res.status(500).json({error}).send(console.log(error)))
}

module.exports = {signUp}