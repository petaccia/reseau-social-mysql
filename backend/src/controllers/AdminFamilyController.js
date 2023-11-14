const AdminFamily = require("../models/AdminFamily");
const User = require("../models/User");
const adminFamilyValidation = require("../services/validation/adminFamilyValidation");

const replaceBackslash = (path) => {
  return path.replace(/\\/g, "/");
};

const getAllAdminFamily = async (req, res) => {
  try {
    const adminFamily = await AdminFamily.findAll();
    res.status(200).json(adminFamily);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOneAdminFamily = async (req, res) => {
  try {
    const adminFamily = await AdminFamily.findOne({
      where: { id: req.params.id },
    });
    if (adminFamily) {
      res.status(200).json(adminFamily);
    } else {
      res.status(404).json("Admin non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const createAdminFamily = async (req, res) => {
  const { body } = req;
  const { error } = adminFamilyValidation(body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    const adminFamily = await AdminFamily.create(body);
    return res.status(201).json(adminFamily);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateAdminFamily = async (req, res) => {
  try {
    const { id } = req.params;
    const updateDatas = req.body;

    const validationError = adminFamilyValidation(updateDatas);
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

    const updatedAdminFamily = await AdminFamily.update(updateData, {
      where: { id },
    });

    if (updatedAdminFamily[0] === 1) {
      res.status(200).send({ message: "Admin family mis à jour avec succès" });
    } else {
      res
        .status(400)
        .send({ message: "Impossible de mettre à jour l'admin family" });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'admin family", error);
    res
      .status(500)
      .send({ message: "Erreur lors de la mise à jour de l'admin family" });
  }
};
// fonction pour mettre a jour l'image de profile d'un adminfamily
const updateAdminFamilyImage = async (req, res) => {
  try {
    const adminFamily = await AdminFamily.findOne({
      where: { id: req.params.id },
    });

    if (!adminFamily) {
      return res.status(404).json({ error: "Administrateur non trouvé" });
    }

    if (req.file) {
      if (adminFamily.profilePicture) {
        const filePath = adminFamily.profilePicture;
        if (filePath) {
          const file = req.file.path;
          adminFamily.profilePicture = file; // Mise à jour du chemin de l'image
          await adminFamily.save();
        }
      } else {
        adminFamily.profilePicture = req.file.path; // Nouveau chemin de l'image
        await adminFamily.save();
      }

      adminFamily.profilePicture = replaceBackslash(adminFamily.profilePicture);

      return res.status(200).json({
        message: "Image de profil mise à jour avec succès",
        profilePicture: adminFamily.profilePicture,
      });
    }
  } catch (err) {
    console.error("Erreur du serveur ", err);
    return res.status(500).json({ error: "Erreur du serveur", err });
  }
  return null;
};

const deleteAdminFamily = async (req, res) => {
  try {
    const adminFamily = await AdminFamily.destroy({
      where: { id: req.params.id },
    });
    if (adminFamily) {
      res.status(200).json("Admin supprimé");
    } else {
      res.status(404).json("Admin non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Fonction pour accepter ou refuser une demande de user

const acceptRequest = async (req, res) => {
  const { userId } = req.params;
  const { status } = req.body;
  try {
    const user = await User.findOne({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({ error: "utilisateur non trouvé" });
    }
    user.status = status;
    await user.save();
    return res.status(200).json({ message: `Demande ${status}e` });
  } catch (error) {
    console.error("Error in acceptRequest", error);
    return res.status(500).json(error);
  }
};

module.exports = {
  acceptRequest,
  getAllAdminFamily,
  getOneAdminFamily,
  createAdminFamily,
  updateAdminFamily,
  updateAdminFamilyImage,
  deleteAdminFamily,
};
