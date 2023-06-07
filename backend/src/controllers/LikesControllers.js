const models = require("../models");

// Creér un nouveau like
const createLike = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    // vérifier si l'utilisateur a déjà aimé cette publication
    const [existingLike] = await models.likes.getLike(userId, postId);
    if (existingLike.length > 0) {
      return res
        .status(409)
        .json({ message: "Vous avez déjà aimé cette publication" });
    }
    const [result] = await models.likes.insert(like);
    res.status(201).json({ message: "Like créer avec succès", result });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
// Obtenir tous les likes
const getLikeAll = async (req, res) => {
  try {
    const [like] = await models.likes.findAll();
    res.send(like);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// Obtenir un like par id
const getLike = async (req, res) => {
  try {
    const likeId = req.params.id;
    const like = await models.likes.getById(likeId);
    res.json(like);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// Mettre à jour un like par id
const updateLike = async (req, res) => {
  try {
    const likeId = req.params.id;
    const updateData = req.body;
    const updatedLike = await models.likes.updateById(likeId, updateData);
    if (!updatedLike) {
      res.status(404);
    } else {
      res.json({ message: "Like modifié avec succès" });
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// Supprimer un like par id
const deleteLike = async (req, res) => {
  try {
    const likeId = req.params.id;
    await models.likes.deleteById(likeId);
    res.json({ message: "Like supprimer avec succès" });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  createLike,
  getLikeAll,
  getLike,
  updateLike,
  deleteLike,
};
