const User = require("../models/User");
const userValidation = require("../services/validation/userValidation");

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
  console.log(body);
  const { error } = userValidation(body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    const user = await User.create({...body, image: req.file ? req.file.path : null});
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateUser = async (req, res) => {
  const { body } = req;
  const { error } = userValidation(body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    await User.update({...body, image: req.file ? req.file.path : null}, { where: { id: req.params.id } });
    const user = await User.findOne(body, { where: { id: req.params.id } });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
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
  getAllUser,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
