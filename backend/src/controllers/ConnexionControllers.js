const cryptojs = require("crypto-js");
const models = require("../models");
const { comparePassword, hashPassword } = require("../services/bcrypt");
const { generateToken } = require("../services/jsonWebToken");

const login = async (req, res) => {
  const emailCrypto = cryptojs
    .HmacSHA256(req.body.email, `${process.env.DB_KEY_SECRET}`)
    .toString();

  try {
    const [result] = await models.connection.findByEmail(emailCrypto);
    if (result == 0) {
      res.status(404).send({ message: "Utilisateur introuvable" });
    } else {
      const passwordMatch = await comparePassword(
        req.body.password,
        result[0].password
      );

      if (passwordMatch) {
        const token = generateToken(result);

        // Ajouter le token dans le cookie
        res.cookie("accessToken", token, {
          httpOnly: true,
          maxAge: 86400000,
        });
        res
          .status(200)
          .send({
            message: "Utilisateur présent dans la base de données",
            result,
            token,
          });
      } else {
        res.status(400).send({ message: "Mot de passe ou email incorrect" });
      }
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// Enregistrer un nouvel utilisateur dans la base de donnée
const register = async (req, res) => {
  const { email, password, familyId } = req.body;
  if (!email || !password || !familyId) {
    res.status(400).send({ message: "paramètres manquants" });
    return;
  }

  const emailCrypto = cryptojs
    .HmacSHA256(req.body.email, `${process.env.DB_KEY_SECRET}`)
    .toString();
console.log(emailCrypto);
  try {
    const [existingUser] = await models.connection.findByEmail(emailCrypto);
    console.log("existingUser", existingUser);

    if (
      existingUser &&
      existingUser.length > 0 &&
      existingUser[0].email === emailCrypto
    ) {
      res.status(409).send({ message: "Cet utilisateur existe déjà" });
      console.log(existingUser.length);
    } else {
      const hashedPassword = await hashPassword(String(req.body.password));
      const newConnection = await models.connection.insert({
        email: emailCrypto,
        password: hashedPassword,
        familyId,
      });
      res
        .status(201)
        .send({ message: "Utilisateur créé avec succès", newConnection });
      console.log(newConnection);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .send({ message: "L'utilisateur à échoué." });
};

module.exports = { register, login, logout };
