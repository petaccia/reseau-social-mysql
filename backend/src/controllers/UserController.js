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
  const { body } = req;
  console.log("Données envoyées au serveur", body);
  try {
    const { id } = req.params;
    const updateDatas = req.body;

    const validationError = userValidation(updateDatas);
    if (validationError) {
      console.error(
        "Erreur de validation des données",
        validationError.details
      );
      res.status(400).send({ message: "Données invalides" });
      return;
    }
    const {
      firstname,
      lastname,
      dateOfBirth,
      numberPhone,
      adress,
      city,
      postalCode,
      country,
    } = req.body;

    const updateData = {
      firstname,
      lastname,
      dateOfBirth,
      numberPhone,
      adress,
      city,
      postalCode,
      country,
    };
    console.log("Données envoyées au serveur", updateData);


    const updatedUser = await User.update(updateData, {
      where: { id },
    });
    console.log("updatedUser in updateUser", updatedUser);

    if (updatedUser[0] === 1) {
      res.status(200).send({ message: "Utilisateur mis à jour avec succès" });
    } else {
      res
        .status(400)
        .send({ message: "Impossible de mettre à jour l'utilisateur" });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du utilisateur", error);
    res
      .status(500)
      .send({ message: "Erreur lors de la mise à jour de l'utilisateur" });
  }
};
// fonction pour mettre a jour l'image de profile d'un adminfamily
const updateUserImage = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
    });

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non enregistré" });
    }

    if (req.file) {
      if (user.profilePicture) {
        const filePath = user.profilePicture;
        if (filePath) {
          const file = req.file.path;
          user.profilePicture = file; // Mise à jour du chemin de l'image
          await user.save();
        }
      } else {
        user.profilePicture = req.file.path; // Nouveau chemin de l'image
        await user.save();
      }

      user.profilePicture = replaceBackslash(user.profilePicture);

      return res
        .status(200)
        .json({ message: "Image de profil mise à jour avec succès" });
    }
  } catch (err) {
    console.error("Erreur du serveur ", err);
    return res.status(500).json({ error: "Erreur du serveur", err });
  }
  return null
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
  updateUserImage,
  deleteUser,
};
