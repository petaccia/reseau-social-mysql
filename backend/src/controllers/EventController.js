const Event = require("../models/Events");

const validateEvent = require("../services/validation/EventValidation");

//lite tous les événements
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    return res.status(200).json(events);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Lire un événement
const getOneEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    return res.status(200).json(event);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Créer un événement
const createEvent = async (req, res) => {
  // validater les données
  const { error } = validateEvent(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  // créer l'événement
  try {
    const event = await Event.create(req.body);
    return res.status(200).json(event);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Modifier un événement
const updateEvent = async (req, res) => {
  // validater les données
  const { error } = validateEvent(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  // modifier l'événement
  try {
    const event = await Event.update(req.body, {
      where: { id: req.params.id },
    });
    return res.status(200).json(event);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Supprimer un événement
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.destroy({
      where: { id: req.params.id },
    });
    return res.status(200).json(event);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllEvents,
  getOneEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};
