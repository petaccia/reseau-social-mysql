const bcrypt = require("bcrypt");
const Connection = require("../models/User");
const { EmailValidation } = require("../services/validation/EmailValidation");

// Vérifier l'email actuel si il existe
const verifyEmail = async (req, res) => {
  try {
    const { userId, email, pass } = req.body;
    const { error } = EmailValidation(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }
    const connection = await Connection.findOne({
      where: { id: userId },
    });
    if (!connection) {
      return res.status(404).json("L'utilisateur n'existe pas");
    }
    // Comparer le mot de passe actuel
    const validPassword = await bcrypt.compare(pass, connection.password);
    if (!validPassword) {
      return res.status(401).json("Mot de passe incorrect");
    }
    // Vérifier si l'email actuel correspond à l'email saisi par l'utilisateur
    if (email !== connection.email) {
      return res.status(401).json("Email incorrect");
    }
    return res.status(200).json("Email valide");
  } catch (err) {
    console.error("Erreur détaillée", err);
    return res
      .status(500)
      .json({ message: "Une erreur est survenue", error: err });
  }
};

// Mettre à jour l'email
const updateEmail = async (req, res) => {
  try {
    const { userId, email } = req.body;

    const { error } = EmailValidation(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const connection = await Connection.findOne({
      where: { id: userId },
    });

    if (!connection) {
      return res.status(404).json("L'utilisateur n'existe pas");
    }

    await Connection.update({ email }, { where: { id: userId } });

    return res.status(200).json("Email mis à jour");
  } catch (err) {
    console.error("Erreur du serveur ", err.response.data);
    return res
      .status(500)
      .json({ message: "Une erreur est survenue", error: err });
  }
};

module.exports = {
  verifyEmail,
  updateEmail,
};
