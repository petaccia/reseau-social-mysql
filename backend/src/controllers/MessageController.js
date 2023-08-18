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
    return res.status(201).json(message);
  } catch (err) {
    console.error("Error: ", err);
    return res.status(500).json(err);
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
      return res.status(200).json("Message modifié");
    }
    return res.status(404).json("Message non enregistré");
  } catch (err) {
    return res.status(500).json(err);
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
const AllDeleteMessage = async (req, res) => {
  try {
    const message = await Message.destroy({ where: {} });
    res
      .status(200)
      .json({ message: "Tous les messages ont été supprimés", count: message });
  } catch (err) {
    res.status(500).json(err);
  }
};

const markReadMessage = async (req, res) => {
  try{
    const message = await Message.findOne({ where: { id: req.params.id } });
    if (!message) {
      return res.status(404).json("Message non enregistré");      
    }
    if (!message.statusRead) {
      message.statusRead = true;
      message.viewedAt = new Date();
      await message.save();
      return res.status(200).json("Message marqué comme lu");
    } 
    return res.status(404).json("Message non lu");
  } catch (err) {
    console.error("Erreur du marquage de la lecture du message: ", err);
    return res.status(500).json(err);
  }
};


module.exports = {
  getAllMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
  AllDeleteMessage,
  markReadMessage
};
