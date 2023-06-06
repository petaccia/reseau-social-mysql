const models = require("../models");

// Creér un nouveau commentaire
const createComment = async (req, res) => {
  try {
    const comment = req.body;
    const [result] = await models.comments.insert(comment);
    res.status(201).json({ message: "Commentaire créer avec succès", result});
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
// Obtenir tous les commentaires
const getCommentAll = async (req,res) => {
  try {
    const [comment] = await models.comments.findAll();
    res.send(comment);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// Obtenir un commentaire par id
const getComment = async (req,res) => {
  try {
    const commentId = req.params.id;
    const comment = await models.comments.getById(commentId);
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// Mettre à jour un commmentaire par id
const updateComment = async (req,res) => {
  try {
    const commentId = req.params.id;
    const updatedComment = req.body;
    await models.comments.updateById(updatedComment, commentId);
    res.json({ message: "Commentaire mis à jour avec succès"})
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// Supprimer un commentaire par id 
const deleteComment = async (req,res) => {
  try {
    const commentId = req.params.id;
    await models.comments.deleteById(commentId);
    res.json({ message: "Commentaire supprimer avec succès"});
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};


module.exports = {
  createComment,
  getCommentAll,
  getComment,
  updateComment,
  deleteComment,
}