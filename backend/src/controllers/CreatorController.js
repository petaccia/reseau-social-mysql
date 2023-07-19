const Creator = require('../models/Creator');

const getOneCreator = async (req, res) => {
  try {
    const creator = await Creator.findOne({ where: { id: req.params.id} });
    if (creator) {
      res.status(200).json(creator);
    }else {
      res.status(404).json("Creator non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const createCreator = async (req, res) => {
  const {body} = req;
  const {error} = creatorValidation(body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    const creator = await Creator.create(body);
    res.status(201).json({ message: "Créateur creé !" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateCreator = async (req, res) => {
  const {body} = req;
  const {error} = creatorValidation(body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    const creator = await Creator.update(body, {where: {id: req.params.id}});
    if (creator) {
      res.status(200).json("Créateur modifié");
    }else {
      res.status(404).json("Créateur non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};


module.exports = {
  getOneCreator,
  createCreator,
  updateCreator
}