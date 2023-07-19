const Connection = require("../models/Connection");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto-js");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const { error } = connectionValidation(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    //Définir un regex pour valider l'email
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Définir un regex pour valider le mot de passe
    const regexPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

    //Vérifier si l'email est valide
    if (!regex.test(email)) {
      return res
        .status(400)
        .json({ error: "L'email doit contenir un format valide" });
    }

    //Vérifier si le mot de passe est valide
    if (!regexPassword.test(password)) {
      return res
        .status(400)
        .json({
          error:
            "Le mot de passe doit contenir au moins 8 caractères, dont au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial",
        });
    }
    // Crypter l'email
    const cryptedEmail = crypto
      .HmacSHA256(email, process.env.DB_CRYPTOJS_SECRET_KEY)
      .toString();

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Vérifier si l'email existe dans la base de données
    const emailExist = await Connection.findOne({
      where: { email: cryptedEmail },
    });
    if (await Connection.findOne({ where: { email: email } })) {
      return res.status(409).json("L'email existe déjà");
    } else {
      const connection = await Connection.create({
        username: username,
        email: cryptedEmail,
        password: hashedPassword,

        // Pour le moment, on met le status à "pending" par défault pour que l'admin puisse le valider
        status: "pending",
      });
      res.status(201).json(connection);

      // Créer un token
      const token = jwt.sign(
        { id: connection.id, email: connection.email },
        process.env.DB_ACCESS_TOKEN_SECRET,
        {
          expiresIn: "24h",
        }
      );
      res.status(200).json({ user: connection, token });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = connectionValidation(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    // Crypter l'email
    const cryptedEmail = crypto
      .HmacSHA256(email, process.env.DB_CRYPTOJS_SECRET_KEY)
      .toString();

    // Vérifier si l'email existe dans la base de données
    const connection = await Connection.findOne({
      where: { email: cryptedEmail },
    });
    if (!connection) {
      return res.status(401).json("Email ou mot de passe incorrect");
    }

    // Comparer si le mot de passe est valide
    const validPassword = await bcrypt.compare(password, connection.password);
    if (!validPassword) {
      return res.status(401).json("Email ou mot de passe incorrect");
    }

    // Créer un token
    const token = jwt.sign(
      { id: connection.id, email: connection.email },
      process.env.DB_ACCESS_TOKEN_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res.status(200).json({ user: connection, token });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Approuver un utilisateur
const approveConnection = async (req, res) => {
  try {
    const { id } = req.params;

    // Rechercher l'utilisateur par son id
    const connection = await Connection.findOne({
      where: { id: id },
    });
    if (!connection) {
      return res.status(404).json("L'utilisateur n'existe pas");
    }

    // Modifier le status de l'utilisateur
    await Connection.update(
      { status: "accepted" },
      { where: { id: id }
    });
    res.status(200).json("Utilisateur approuvé");
  } catch (error) {
    res.status(500).json({ message: "Une erreur est survenue" });
  }
};

module.exports = {
  register,
  login,
  approveConnection,
}
