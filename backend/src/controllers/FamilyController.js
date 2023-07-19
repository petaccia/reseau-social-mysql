const Family = require("../models/Family");

const getAllFamily = async (req, res) => {
  try {
    const family = await Family.findAll();
    res.status(200).json(family);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOneFamily = async (req, res) => {
  try {
    const family = await Family.findOne({ where: { id: req.params.id} });
    if (family) {
      res.status(200).json(family);
    }else {
      res.status(404).json("Famile non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const createFamily = async (req, res) => {
  const {body} = req;
  const {error} = familyValidation(body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    const family = await Family.create(body);
    res.status(201).json(family);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateFamily = async (req, res) => {
  const {body} = req;
  const {error} = familyValidation(body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    const family = await Family.update(body, {where: {id: req.params.id}});
    if (family) {
      res.status(200).json("Famile modifié");
    }else {
      res.status(404).json("Famile non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteFamily = async (req, res) => {
  try {
    const family = await Family.destroy({where: {id: req.params.id}});
    if (family) {
      res.status(200).json("Famile supprimé");
    }else {
      res.status(404).json("Famile non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllFamily,
  getOneFamily,
  createFamily,
  updateFamily,
  deleteFamily
}