const Role = require("../models/Roles");

const getAllRoles = async (req, res) => {
  try {
    const role = await Role.findAll();
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOneRole = async (req, res) => {
  try {
    const role = await Role.findOne({ where: { id: req.params.id } });
    if (role) {
      res.status(200).json(role);
    } else {
      res.status(404).json("Role non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const createRole = async (req, res) => {
  const { body } = req;
  const { error } = roleValidation(body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    const role = await Role.create(body);
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateRole = async (req, res) => {
  const { body } = req;
  const { error } = roleValidation(body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    const role = await Role.update(body, { where: { id: req.params.id } });
    if (role) {
      res.status(200).json("Role modifié");
    } else {
      res.status(404).json("Role non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteRole = async (req, res) => {
  try {
    const role = await Role.destroy({ where: { id: req.params.id } });
    if (role) {
      res.status(200).json("Role supprimé");
    } else {
      res.status(404).json("Role non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllRoles,
  getOneRole,
  createRole,
  updateRole,
  deleteRole,
};
