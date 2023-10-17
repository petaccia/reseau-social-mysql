const AdminFamily = require("../models/AdminFamily");
const User = require("../models/User");
const adminFamilyValidation = require("../services/validation/adminFamilyValidation");

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
  const { body } = req;
  const { error } = adminFamilyValidation(body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    const adminFamily = await AdminFamily.update(body, {
      where: { id: req.params.id },
    });
    if (adminFamily) {
      return res.status(200).json("Admin modifié");
    }
    if (!adminFamily) {
      return res.status(404).json("Admin non enregistré");
    }
    return null;
  } catch (err) {
    return res.status(500).json(error);
  }
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
  const { userId, status } = req.body;
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
  deleteAdminFamily,
};
