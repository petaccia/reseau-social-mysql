const Admin = require("../models/Admin");
const adminValidation = require("../services/validation/adminValidation");

const getAllAdmin = async (req, res) => {
  try {
    const admin = await Admin.findAll();
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOneAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ where: { id: req.params.id } });
    if (admin) {
      res.status(200).json(admin);
    } else {
      res.status(404).json("Admin non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const createAdmin = async (req, res) => {
  const { body } = req;
  const { error } = adminValidation(body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    const admin = await Admin.create(body);
    res.status(201).json(admin);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateAdmin = async (req, res) => {
  const { body } = req;
  const { error } = adminValidation(body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    const admin = await Admin.update(body, { where: { id: req.params.id } });
    if (admin) {
      return res.status(200).json("Admin modifié");
    }
    return res.status(404).json("Admin non enregistré");
  } catch (err) {
    return res.status(500).json(err);
  }
};
const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.destroy({ where: { id: req.params.id } });
    if (admin) {
      res.status(204).json("Admin supprimé");
    } else {
      res.status(404).json("Admin non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllAdmin,
  getOneAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
