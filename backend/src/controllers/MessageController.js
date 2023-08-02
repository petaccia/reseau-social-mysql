const Message = require("../models/Messages");

const {
  messageValidation,
} = require("../services/validation/messageValidation");

const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMessage = async (req, res) => {
  try {
    const message = await Message.findOne({ where: { id: req.params.id } });
    if (message) {
      res.status(200).json(message);
    } else {
      res.status(404).json("Message non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const createMessage = async (req, res) => {
  const { body } = req;
  const { error } = messageValidation(body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    const message = await Message.create(body);
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateMessage = async (req, res) => {
  const { body } = req;
  const { error } = messageValidation(body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    const message = await Message.update(body, {
      where: { id: req.params.id },
    });
    if (message) {
      res.status(200).json("Message modifié");
    } else {
      res.status(404).json("Message non enregistré");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteMessage = async (req, res) => {
  try {
    const message = await Message.destroy({ where: { id: req.params.id } });
    if (message) {
      res.status(200).json("Message supprimé");
    } else {
      res.status(404).json("Message non enregistré");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
};
