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
  console.log("bodybackend", body);
  const { error } = messageValidation(body);

  if (error) {
    return res.status(400).json(error.details.map(detail => detail.message));
  }
  //Définir le status de la lecture par défaut
  body.statusRead = "sent";

  // Définir le status du message par défaut
  body.status = false;
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

// Fonction pour mettre à jour le status de la visualisation de lecture  d'un message
const updateViewStatus = async (req, res) => {
  try {
      // Vérification du body
      const { status } = req.body;
      if (typeof status !== "boolean") {
          return res.status(400).json({
              success: false,
              message: "Le status de visualisation n'est pas valide"
          });
      }

      // Vérification de l'existence du message
      const existingMessage = await Message.findOne({ where: { id: req.params.id } });
      if (!existingMessage) {
          return res.status(404).json({
              success: false,
              message: "Message non trouvé"
          });
      }

      // Mise à jour du message
      const updatedMessage = await Message.update({ status }, { where: { id: req.params.id } });
      if (updatedMessage[0] === 1) {
          return res.status(200).json({
              success: true,
              message: "Le status de visualisation a bien été mis à jour"
          });
      } else {
          return res.status(500).json({
              success: false,
              message: "Le message n'a pas pu être modifié"
          });
      }
  } catch (err) {
      console.error("Erreur lors de la mise à jour du status de visualisation:", err);
      return res.status(500).json({
          success: false,
          message: "Erreur serveur"
      });
  }
};

module.exports = {
  getAllMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
  AllDeleteMessage,
  updateViewStatus,
};
