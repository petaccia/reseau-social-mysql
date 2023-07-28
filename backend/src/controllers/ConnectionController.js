const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto-js");
const Connection = require("../models/Connection");
const {RegisterValidation, LoginValidation} = require("../services/validation/ConnectionValidation");

const register = async (req, res) => {
  console.log("data" , req.body);
  try {
    const { username, email, password } = req.body;
    // console.log(req.body);
    const { error } = RegisterValidation(req.body);
    console.log("validation", error); 
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    // Définir un regex pour valider l'email
    const regex =
      /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Définir un regex pour valider le mot de passe
    const regexPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

    // Vérifier si l'email est valide
    if (!regex.test(email)) {
      console.log("invalid email");
      return res
        .status(400)
        .json({ error: "L'email doit contenir un format valide" });
    }

    // Vérifier si le mot de passe est valide
    if (!regexPassword.test(password)) {
      console.log("invalid password");
      return res.status(400).json({
        error:
          "Le mot de passe doit contenir au moins 8 caractères, dont au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial",
      });
    }
    // Crypter l'email
    const cryptedEmail = crypto
      .HmacSHA256(email, process.env.DB_CRYPTOJS_SECRET_KEY)
      .toString();
      console.log("---------------cryptedEmail",cryptedEmail);

    // Hacher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("---------------hashedPassword",hashedPassword);

    // Vérifier si l'email existe dans la base de données
    console.log("Creating user with data", {
      username: username,
      email: cryptedEmail,
      password: hashedPassword,
    });
    const emailExist = await Connection.findOne({
      where: { email: cryptedEmail },
    });
    console.log("------------------------emailExist", emailExist);
    if (emailExist) {
      return res.status(409).json("L'email existe déjà");
    }

    const connection = await Connection.create({
      username,
      email: cryptedEmail,
      password: hashedPassword,
      // Pour le moment, on met le status à "pending" par défault pour que l'admin puisse le valider
      status: "pending",
    });
    console.log("user created", connection);

    // Créer un token
    const token = jwt.sign(
      { id: connection.id, email: connection.email },
      process.env.DB_ACCESS_TOKEN_SECRET,
      {
        expiresIn: "24h",
      }
    );
    console.log("---------->>token", token);
    res.status(200).json({ user: connection, token });
  } catch (error) {
    console.log("------------------->error catch", error);
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = LoginValidation(req.body);
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
      where: { id },
    });
    if (!connection) {
      return res.status(404).json("L'utilisateur n'existe pas");
    }

    // Modifier le status de l'utilisateur
    await Connection.update({ status: "accepted" }, { where: { id } });
    res.status(200).json("Utilisateur approuvé");
  } catch (error) {
    res.status(500).json({ message: "Une erreur est survenue" });
  }
};

module.exports = {
  register,
  login,
  approveConnection,
};
