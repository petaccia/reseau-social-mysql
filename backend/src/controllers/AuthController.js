const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto-js");

const { AdminFamily, Family, User } = require("../models/indexModels");
const {
  AdminFamilyRegisterValidation,
} = require("../services/validation/ConnectionAdminFamilyValidation");

const {
  RegisterValidation,
  LoginValidation,
} = require("../services/validation/ConnectionUserValidation");

// Inscription de l'AdminFamily et creation de la famille avec le mot de passe haché et l'email crypté
const signupAdminFamily = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const { error } = AdminFamilyRegisterValidation(req.body);
    console.log("erreur après validation", error);
    if (error) {
      console.log("Eurrteur de validation", error);
      return res.status(400).json({ error: error.details[0].message });
    }
    // Crypter l'email
    const cryptedEmail = crypto
      .HmacSHA256(req.body.email, process.env.DB_CRYPTOJS)
      .toString();
    console.log("email crypté in signupAdminFamily back", cryptedEmail);

    // hacher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Vérifier si l'email existe dans la base de données
    const existEmail = await AdminFamily.findOne({
      where: { email: cryptedEmail },
    });
    console.log(
      "Vérification de l'email existant dans signupAdminFamily back",
      existEmail
    );
    if (existEmail) {
      return res.status(409).json("Email déjà utilisé");
    }
    // Creer une famille
    const newFamily = await Family.create({
      name: req.body.familyName,
    });

    console.log(
      "Nouvelle famille crée avec succès in signupAdminFamily back",
      newFamily
    );

    // Creer un adminFamily
    const newAdminFamily = await AdminFamily.create({
      name: req.body.username,
      email: cryptedEmail,
      password: hashedPassword,
      roleId: 1,
      familyId: newFamily.id,
    });
    // Créer un token pour l'adminFamily
    const token = jwt.sign(
      {
        id: newAdminFamily.id,
        email: newAdminFamily.email,
        name: newAdminFamily.name,
        familyId: newAdminFamily.familyId,
        roleId: newAdminFamily.roleId,
        status: newAdminFamily.status,
      },
      process.env.DB_ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    console.log("Resultat du token JWT", token);
    return res
      .status(201)
      .json({ message: "AdminFamily crée avec succès", newAdminFamily, token });
  } catch (error) {
    console.error("Erreur lors de l'inscription de l'AdminFamily : ", error);
    return res.status(500).json({ message: "Erreur du serveur", error });
  }
};

// Inscription de l'utilisateur et  avec le mot de passe haché et l'email crypté avec envoie à l'adminFamily pour l'ajout de l'utilisateur
const signupUser = async (req, res) => {
  try {
    const { error } = RegisterValidation(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    // Crypter l'email
    const cryptedEmail = crypto
      .HmacSHA256(req.body.email, process.env.DB_CRYPTOJS)
      .toString();

    // hacher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Vérifier si l'email existe dans la base de données
    const existEmail = await User.findOne({
      where: { email: cryptedEmail },
    });
    if (existEmail) {
      return res.status(409).json("Email déjà utilisé");
    }
    // Creer un utilisateur
    const newUser = await User.create({
      email: cryptedEmail,
      password: hashedPassword,
      username: req.body.firstname,
      status: "en attente",
    });
    return res
      .status(200)
      .json({ message: "Utilisateur créé avec succès !", newUser });
  } catch (error) {
    console.error("Erreur lors de l'inscription de l'utilisateur : ", error);
    return res.status(500).json({ message: "Erreur du serveur", error });
  }
};

const loginUnified = async (req, res) => {
  try {
    const { error } = LoginValidation(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Crypter l'email
    const cryptedEmail = crypto
      .HmacSHA256(req.body.email, process.env.DB_CRYPTOJS)
      .toString();
    console.log("email crypté in loginUnified back", cryptedEmail);

    // Vérifier si l'email existe dans la base de données pour l'adminFamily
    const userAdminFamily = await AdminFamily.findOne({
      where: { email: cryptedEmail },
    });
    console.log("utilisateur trouvé dans adminFamily", userAdminFamily);

    let regularUser;
    if (!userAdminFamily) {
      regularUser = await User.findOne({
        where: { email: cryptedEmail },
      });
      console.log("utilisateur trouvé dans users", regularUser);
    }

    const user = userAdminFamily || regularUser;
    const userType = userAdminFamily ? "adminFamily" : "user";

    if (!user) {
      return res.status(401).json("Email ou mot de passe incorrect");
    }

    // Comparer le mot de passe
    console.log("mot de passe actuel base de données", req.body.password);
    console.log("mot de passe stocker dans user", user.password);
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    console.log("Mot de passe comparé", isMatch);
    if (!isMatch) {
      return res.status(401).json("Email ou mot de passe incorrect");
    }

    // Si c'est un adminFamily, vérifier les conditions nécessaires
    if (userType === "adminFamily") {
      // Ici, vous pouvez ajouter des conditions spécifiques pour l'adminFamily
    }

    // Créer un token
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
        status: user.status,
        userType,
      },
      process.env.DB_ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(200).json({ token, name: user.name, userType });
  } catch (error) {
    console.error("Erreur lors de la connexion de l'utilisateur : ", error);
    return res.status(500).json({ message: "Erreur du serveur", error });
  }
};
module.exports = {
  signupAdminFamily,
  signupUser,
  loginUnified,
};
