const bcrypt = require("bcrypt");
const Connection = require("../models/Connection");
const {
  PasswordValidation,
} = require("../services/validation/PasswordValidation");

// vérifier le password actuel
const verifyPassword = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const { error } = PasswordValidation(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }
    const connection = await Connection.findOne({
      where: { id: userId },
    });
    if (!connection) {
      return res.status(404).json("L'utilisateur n'existe pas");
    }
    const validPassword = await bcrypt.compare(password, connection.password);
    if (!validPassword) {
      return res.status(401).json("Mot de passe incorrect");
    }
    return res.status(200).json("Mot de passe valide");
  } catch (err) {
    console.error("Erreur détaillée", err);
    return res
      .status(500)
      .json({ message: "Une erreur est survenue", error: err });
  }
};

// Mettre à jour le password
const updatePassword = async (req, res) => {
  console.log(" req.body in updatePassword", req.body);
  try {
    const { userId, password } = req.body;
    console.log("Avant la validation du password", req.body);
    const { error } = PasswordValidation(req.body);
    console.log("Après la validation du password", req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }
    const connection = await Connection.findOne({
      where: { id: userId },
    });
    if (!connection) {
      return res.status(404).json("L'utilisateur n'existe pas");
    }
    console.log("newPassword", password);
    const hash = await bcrypt.hash(password, 10);
    await Connection.update({ password: hash }, { where: { id: userId } });
    res.status(200).json("Mot de passe mis à jour");
  } catch (err) {
    console.error("Erreur détaillée", err);
    res.status(500).json({ message: "Une erreur est survenue", error: err });
  }
};

module.exports = {
  verifyPassword,
  updatePassword,
};
