const Contact = require("../models/Contact");
const contactValidation = require("../services/validation/ContactValidation");

const getAllContact = async (req, res) => {
  try {
    const contact = await Contact.findAll();
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOneContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({ where: { id: req.params.id } });
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json("Contact non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const createContact = async (req, res) => {
  const { body } = req;
  const { error } = contactValidation(body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    const contact = await Contact.create(body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateContact = async (req, res) => {
  const { body } = req;
  const { error } = contactValidation(body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    const contact = await Contact.update(body, {
      where: { id: req.params.id },
    });
    if (contact) {
      res.status(200).json("Contact modifié");
    } else {
      res.status(404).json("Contact non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.destroy({ where: { id: req.params.id } });
    if (contact) {
      res.status(200).json("Contact supprimé");
    } else {
      res.status(404).json("Contact non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllContact,
  getOneContact,
  createContact,
  updateContact,
  deleteContact,
};
