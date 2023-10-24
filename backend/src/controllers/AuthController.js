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

// Fonction pour la création d'un compte administrateur de la famille
const signupAdminFamily = async (req, res) => {
  try {
    const { error } = AdminFamilyRegisterValidation(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Cryptage de l'adresse e-mail
    const cryptedEmail = crypto
      .HmacSHA256(req.body.email, process.env.DB_CRYPTOJS)
      .toString();

    // Hashage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Verifier si l'adresse e-mail est déjà utilisée
    const existEmail = await AdminFamily.findOne({
      where: { email: cryptedEmail },
    });

    if (existEmail) {
      return res.status(409).json("Email déjà utilisé");
    }

    // Création de la nouvelle famille
    const newFamily = await Family.create({
      name: req.body.familyName,
    });
    // Trouver le rôle AdminFamily
    const role = await Role.findOne({
      where: { name: "AdminFamily" },
    });
    if (!role) {
      return res.status(404).json("Rôle spécifié introuvable");
    }

    // Variables du rôle AdminFamily pour l'insertion de l'administrateur de la famille
    const roleId = role.id;

    // Création de l'administrateur de la famille
    const newAdminFamily = await AdminFamily.create({
      firstname: req.body.username,
      email: cryptedEmail,
      password: hashedPassword,
      roleId,
      familyId: newFamily.id,
    });

    // Envoi du token de l'administrateur de la famille
    const token = jwt.sign(
      {
        id: newAdminFamily.id,
        email: newAdminFamily.email,
        name: newAdminFamily.name,
        familyId: newAdminFamily.familyId,
        roleId: newAdminFamily.roleId,
        status: newAdminFamily.status,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Envoi du token de l'administrateur de la famille
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3600000,
    });

    return res
      .status(201)
      .json({ message: "AdminFamily créé avec succès", newAdminFamily, token });
  } catch (error) {
    console.error("Erreur lors de l'inscription de l'AdminFamily : ", error);
    return res.status(500).json({ message: "Erreur du serveur", error });
  }
};

// Fonction pour la création d'un utilisateur
const signupUser = async (req, res) => {
  try {
    const { error } = RegisterValidation(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Cryptage de l'adresse e-mail
    const cryptedEmail = crypto
      .HmacSHA256(req.body.email, process.env.DB_CRYPTOJS)
      .toString();

    // Hashage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Verifier si l'adresse e-mail est déjà utilisée
    const existEmail = await User.findOne({
      where: { email: cryptedEmail },
    });

    if (existEmail) {
      return res.status(409).json("Email déjà utilisé");
    }

    // Trouver la famille dans laquelle l'utilisateur souhaite s'inscrire
    const family = await Family.findOne({
      where: {
        name: req.body.familyName,
      },
    });

    if (!family) {
      return res.status(404).json("La famille n'existe pas");
    }

    // Trouver le rôle User
    const role = await Role.findOne({
      where: { name: "User" },
    });

    if (!role) {
      return res.status(404).json("Rôle spécifié introuvable");
    }
    // Variables du rôle User pour l'insertion de l'utilisateur
    const roleId = role.id;

    // Création de l'utilisateur
    const newUser = await User.create({
      email: cryptedEmail,
      password: hashedPassword,
      firstname: req.body.username,
      status: "en attente",
      familyId: family.id,
      roleId,
    });

    // Envoi du token de l'utilisateur
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        name: newUser.username,
        familyId: newUser.familyId,
        roleId: newUser.roleId,
        status: newUser.status,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3600000,
    });

    return res
      .status(201)
      .json({ message: "Utilisateur créé avec succès !", newUser, token });
  } catch (error) {
    console.error("Erreur lors de l'inscription de l'utilisateur : ", error);
    return res.status(500).json({ message: "Erreur du serveur", error });
  }
};

// Fonction de connexion unifiée pour les utilisateurs et les administrateurs de la famille
const loginUnified = async (req, res) => {
  try {
    const { error } = LoginValidation(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Cryptage de l'adresse e-mail
    const cryptedEmail = crypto
      .HmacSHA256(req.body.email, process.env.DB_CRYPTOJS)
      .toString();

    // trouver l'administrateur de la famille dans la base de données par l'adresse e-mail
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

    // Vérifier le statut de l'utilisateur
    if (userType === "user") {
      if (user.status === "en attente") {
        return res
          .status(401)
          .json("Votre compte est en attente de validation");
      }
      if (user.status === "accepté") {
        return res.status(200).json("Vous êtes connecté avec succès");
      }
    }

    // Comparer le mot de passe
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(401).json("Informations d'identification invalides");
    }

    // Envoi du token de l'utilisateur
    const token = jwt.sign(
      {
        id: user.id,
        name: user.firstname,
        email: user.email,
        roleId: user.roleId,
        status: user.status,
        familyId: user.familyId,
        userType,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3600000,
    });

    return res.status(200).json({ token, user, userType });
  } catch (error) {
    console.error("Erreur lors de la connexion de l'utilisateur : ", error);
    return res.status(500).json({ message: "Erreur du serveur", error });
  }
};

// Fonction pour la déconnexion de l'utilisateur
const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ message: "Utilisateur deconnecté avec_succès" });
  } catch (error) {
    console.error("Erreur lors de la deconnexion de l'utilisateur : ", error);
    return res.status(500).json({ message: "Erreur du serveur", error });
  }
};

module.exports = {
  signupAdminFamily,
  signupUser,
  loginUnified,
  logout,
};
