const Comments = require("../models/Comments");


const getAllComments = async (req, res) => {
  try {
    const comments = await Comments.findAll();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOneComment = async (req, res) => {
  try {
    const comment = await Comments.findOne({ where: { id: req.params.id} });
    if (comment) {
      res.status(200).json(comment);
    }else {
      res.status(404).json("Comment non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const createComment = async (req, res) => {
  const {body} = req;
  const {error} = commentsValidation(body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    const comment = await Comments.create(body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateComment = async (req, res) => {
  const {body} = req;
  const {error} = commentsValidation(body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    const comment = await Comments.update(body, {where: {id: req.params.id}});
    if (comment) {
      res.status(200).json("Comment modifié");
    }else {
      res.status(404).json("Comment non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comments.destroy({where: {id: req.params.id}});
    if (comment) {
      res.status(200).json("Comment supprimé");
    }else {
      res.status(404).json("Comment non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllComments,
  getOneComment,
  createComment,
  updateComment,
  deleteComment
}