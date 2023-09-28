const User = require("../models/User");
const userValidation = require("../services/validation/userValidation");


// Remplacer le backslash par un slash
const replaceBackslash = (path) => {
  return path.replace(/\\/g, "/");
};

// Obtenir tous les utilisateurs en attente de validation
const getPendingUsers = async (req, res) => {
  try {
    const users = await User.findAll({ where: { status: "en attente" } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
};
const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getOneUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (user) {
      if (user.profilePicture) {
        user.profilePicture = replaceBackslash(user.profilePicture);
      }
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createUser = async (req, res) => {
  const { body } = req;
  console.info(body);
  const { error } = userValidation(body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    const user = await User.create({
      ...body,
      image: req.file ? req.file.path : null,
    });
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const updateUser = async (req, res) => {
  console.info(req.body);
  console.info(req.file);
  const { body } = req;
  const { error } = userValidation(body);
  if (error) {
    console.log(" Avant d'envoyer les données", error);
    return res.status(400).json(error.details[0].message);
    console.log(" Après d'envoyer les données", error);
  }
  try {
    await User.update(
      { ...body, profilePicture: req.file ? req.file.path : null },
      { where: { id: req.params.id } }
    );
    const user = await User.findOne({ where: { id: req.params.id } });
    if (user && user.profilePicture) {
      user.profilePicture = replaceBackslash(user.profilePicture);
    }
    console.log(" Données reçu de l'API", user);
    if (user) {
      return res.status(200).json({ message: " Utilsateur modifié avec succès", user});
    }
    return res.status(404).json({ error: "User not found" });
  } catch (err) {
    console.error("Erreur du serveur ", err.response);
    return res.status(500).json({ err });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.destroy({ where: { id: req.params.id } });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getPendingUsers,
  getAllUser,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
