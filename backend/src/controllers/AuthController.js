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

const signupAdminFamily = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const { error } = AdminFamilyRegisterValidation(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const cryptedEmail = crypto
      .HmacSHA256(req.body.email, process.env.DB_CRYPTOJS)
      .toString();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const existEmail = await AdminFamily.findOne({
      where: { email: cryptedEmail },
    });

    if (existEmail) {
      return res.status(409).json("Email déjà utilisé");
    }

    const newFamily = await Family.create({
      name: req.body.familyName,
    });

    const role = await Role.findOne({
      where: { name: "AdminFamily" },
    });
    if (!role) {
      return res.status(404).json("Rôle spécifié introuvable");
    }
    const roleId = role.id;

    const newAdminFamily = await AdminFamily.create({
      name: req.body.username,
      email: cryptedEmail,
      password: hashedPassword,
      roleId,
      familyId: newFamily.id,
    });

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

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 3600000,
    });

    return res.status(201).json({ message: "AdminFamily créé avec succès", newAdminFamily, token });
  } catch (error) {
    console.error("Erreur lors de l'inscription de l'AdminFamily : ", error);
    return res.status(500).json({ message: "Erreur du serveur", error });
  }
};

const signupUser = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const { error } = RegisterValidation(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const cryptedEmail = crypto
      .HmacSHA256(req.body.email, process.env.DB_CRYPTOJS)
      .toString();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const existEmail = await User.findOne({
      where: { email: cryptedEmail },
    });

    if (existEmail) {
      return res.status(409).json("Email déjà utilisé");
    }

    const family = await Family.findOne({
      where: {
        name: req.body.familyName,
      },
    });

    if (!family) {
      return res.status(404).json("La famille n'existe pas");
    }

    const role = await Role.findOne({
      where: { name: "User" },
    });

    if (!role) {
      return res.status(404).json("Rôle spécifié introuvable");
    }
    const roleId = role.id;

    const newUser = await User.create({
      email: cryptedEmail,
      password: hashedPassword,
      firstname: req.body.username,
      status: "en attente",
      familyId: family.id,
      roleId,
    });

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
      secure: false,
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

const loginUnified = async (req, res) => {
  try {
    const { error } = LoginValidation(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const cryptedEmail = crypto
      .HmacSHA256(req.body.email, process.env.DB_CRYPTOJS)
      .toString();

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

    if (userType === "user") {
      if (user.status === "en attente") {
        console.log("user no accepted", userType);
        console.log("user.status in no accepted", user.status);
        return res.status(401).json("Votre compte est en attente de validation");
      } else if (user.status === "accepté") {
        console.log("user accepted", userType);
        console.log("user.status in accepted", user.status);
        return res.status(200).json("Vous êtes connecté avec succès");
      }
    }
        
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(401).json("Informations d'identification invalides");
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.firstname,
        email: user.email,
        roleId: user.roleId,
        status: user.status,
        userType,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
      );
      
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 3600000,
      });
      console.log("user", user.firstname);

    return res.status(200).json({ token, name: user.firstname, userType });
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
