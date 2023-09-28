const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto-js");

const { AdminFamily, Family, User, Role } = require("../models/indexModels");
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

    // Rechercher le role dans la base de données
    const role = await Role.findOne({
      where: { name: "AdminFamily" },
    });
    if (!role) {
      return res.status(404).json("Role spécifié introuvable");
    }
    const roleId = role.id;

    // Creer un adminFamily
    const newAdminFamily = await AdminFamily.create({
      name: req.body.username,
      email: cryptedEmail,
      password: hashedPassword,
      roleId,
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
  console.log("req.body", req.body);
  try {
    const { error } = RegisterValidation(req.body);
    console.log("erreur de validation", error);
    if (error) {
      console.log("Eurrteur de validation", error);
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

    // vérifieer si la famille existe par le nom de famille
    const family = await Family.findOne({
      where: {
        name: req.body.familyName,
      },
    });
    console.log("nom de la famille trouvé", family);
    if (!family) {
      return res.status(404).json("La famille n'existe pas");
    }

    // Rechercher le role dans la base de données
    const role = await Role.findOne({
      where: { name: "User" },
    });
    console.log("role trouve", role);
    if (!role) {
      return res.status(404).json("Role spécifié introuvable");
    }
    const roleId = role.id;

    // Creer un utilisateur
    const newUser = await User.create({
      email: cryptedEmail,
      password: hashedPassword,
      firstname: req.body.username,
      status: "en attente",
      familyId: family.id,
      roleId,
    });
    // Créer un token pour l'utilisateur
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        name: newUser.username,
        familyId: newUser.familyId,
        roleId: newUser.roleId,
        status: newUser.status,
      },
      process.env.DB_ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    console.log("nouvel utilisateur", newUser);
    return res
      .status(201)
      .json({ message: "Utilisateur créé avec succès !", newUser, token });
  } catch (error) {
    console.error("Erreur lors de l'inscription de l'utilisateur : ", error);
    return res.status(500).json({ message: "Erreur du serveur", error });
  }
};

const loginUnified = async (req, res) => {
  console.log("req.body loginunified in back", req.body);
  try {
    const { error } = LoginValidation(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Crypter l'email
    const cryptedEmail = crypto
      .HmacSHA256(req.body.email, process.env.DB_CRYPTOJS)
      .toString();

    // Vérifier si l'email existe dans la base de données pour l'adminFamily
    const userAdminFamily = await AdminFamily.findOne({
      where: { email: cryptedEmail },
    });

    let user = userAdminFamily;
    let userType = "adminFamily";

    if (!userAdminFamily) {
      user = await User.findOne({
        where: { email: cryptedEmail },
      });
      userType = "user";
    }

    if (!user) {
      return res.status(401).json("Informations d'identification invalides");
    }

    // Verifier si le status de l'utilisateur est "accepté"
    if (userType==="user" && user.status !== "accepte") {
      return res.status(401).json("Votre compte est en attente de validation");
    }

    // Comparer le mot de passe
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json("Informations d'identification invalides");
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
      console.log("token in loginUnified back", token);
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
