const User = require("../models/User");

const getAllUser = async (req, res) => {
  try {
    const user = await User.findAll();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id} });
    if (user) {
      res.status(200).json(user);
    }else {
      res.status(404).json("User non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const createUser = async (req, res) => {
  const {body} = req;
  const {error} = userValidation(body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    const user = await User.create(body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  const {body} = req;
  const {error} = userValidation(body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    const user = await User.update(body, {where: {id: req.params.id}});
    if (user) {
      res.status(200).json("User modifié");
    }else {
      res.status(404).json("User non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.destroy({where: {id: req.params.id}});
    if (user) {
      res.status(200).json("User supprimé");
    }else {
      res.status(404).json("User non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllUser,
  getUser,
  createUser,
  updateUser,
  deleteUser,
}