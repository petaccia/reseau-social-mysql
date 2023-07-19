const AdminFamily = require("../models/AdminFamily");

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
    const adminFamily = await AdminFamily.findOne({ where: { id: req.params.id} });
    if (adminFamily) {
      res.status(200).json(adminFamily);
    }else {
      res.status(404).json("Admin non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const createAdminFamily = async (req, res) => {
  const {body} = req;
  const {error} = adminFamilyValidation(body);
  if (error) {
    return res.status(400).json(error.details[0].message);
      }
  try {
    const adminFamily = await AdminFamily.create(body);
    res.status(201).json(adminFamily);
  } catch (error) {
    res.status(500).json(error);
  }
  };

const updateAdminFamily = async (req, res) => {
  const {body} = req;
  const {error} = adminFamilyValidation(body);
  if (error) {
    return res.status(400).json(error.details[0].message);
      }
  try {
    const adminFamily = await AdminFamily.update(body, {where: {id: req.params.id}});
    if (adminFamily) {
      res.status(200).json("Admin modifié");
    }else {
      res.status(404).json("Admin non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteAdminFamily = async (req, res) => {
  try {
    const adminFamily = await AdminFamily.destroy({where: {id: req.params.id}});
    if (adminFamily) {
      res.status(200).json("Admin supprimé");
    }else {
      res.status(404).json("Admin non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllAdminFamily,
  getOneAdminFamily,
  createAdminFamily,
  updateAdminFamily,
  deleteAdminFamily
}

