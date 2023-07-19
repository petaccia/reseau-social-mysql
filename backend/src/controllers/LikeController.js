const Like = require("../models/Likes");

const getAllLike = async (req, res) => {
  try {
    const like = await Like.findAll();
    res.status(200).json(like);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOneLike = async (req, res) => {
  try {
    const like = await Like.findOne({ where: { id: req.params.id} });
    if (like) {
      res.status(200).json(like);
    }else {
      res.status(404).json("Like non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const createLike = async (req, res) => {
  const {body} = req;
  const {error} = likeValidation(body);
  if (error) {
    return res.status(400).json(error.details[0].message);
      }
  try {
    const like = await Like.create(body);
    res.status(201).json(like);
  } catch (error) {
    res.status(500).json(error);
  }
  };

const updateLike = async (req, res) => {
  const {body} = req;
  const {error} = likeValidation(body);
  if (error) {
    return res.status(400).json(error.details[0].message);
      }
  try {
    const like = await Like.update(body, {where: {id: req.params.id}});
    if (like) {
      res.status(200).json("Like modifié");
    }else {
      res.status(404).json("Like non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteLike = async (req, res) => {
  try {
    const like = await Like.destroy({where: {id: req.params.id}});
    if (like) {
      res.status(200).json("Like supprimé");
    }else {
      res.status(404).json("Like non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllLike,
  getOneLike,
  createLike,
  updateLike,
  deleteLike
}
