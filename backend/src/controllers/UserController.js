const User = require("../models/User");
const userValidation = require("../services/validation/userValidation");

// Remplacer le backslash par un slash
const replaceBackslash = (path) => {
  return path.replace(/\\/g, "/");
};

// Obtenir tous les utilisateurs en attente de validation
const getPendingUsers = async (req, res) => {
  try {
    // Récupérer l'ID de l'administrateur de famille cible depuis les paramètres de la requête
    const currentAdminFamily = req.user;

    const users = await User.findAll({
      where: {
        status: "en attente",
        // Filtrer par l'id de la famille de l'adminFamily actuellement connecté
        familyId: currentAdminFamily.familyId,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Obtenir tous les utilisateurs acceptés
const getAcceptedAllUsers = async (req, res) => {
  try {
    // Récupérer l'ID de l'administrateur de famille cible depuis les paramètres de la requête
    const currentAdminFamily = req.user;

    const users = await User.findAll({
      where: { status: "accepté", familyId: currentAdminFamily.familyId },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

// Obtenir tous les utilisateurs refusés
const getRefusedAllusers = async (req, res) => {
  try {
    // Récupérer l'ID de l'administrateur de famille cible depuis les paramètres de la requête
    const currentAdminFamily = req.user;

    const users = await User.findAll({
      where: { status: "refusé", familyId: currentAdminFamily.familyId },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
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
    console.log("Avant d'envoyer les données", error); // Utilisez console.log ici pour le débogage
    return res.status(400).json({ error: error.details[0].message });
    console.log("Apres d'envoyer les données", error);
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
    console.info("Données reçues de l'API", user); // Utilisez console.info pour afficher les données récupérées
    if (user) {
      return res
        .status(200)
        .json({ message: "Utilisateur modifié avec succès", user });
    }
    return res.status(404).json({ error: "User not found" });
  } catch (err) {
    console.error("Erreur du serveur ", err.response); // Utilisez console.error pour afficher les erreurs du serveur
    return res.status(500).json({ error: "Erreur du serveur" });
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
  getAcceptedAllUsers,
  getRefusedAllusers,
  getAllUser,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
