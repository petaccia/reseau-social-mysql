const Post = require("../models/Post");

const getAllPost = async (req, res) => {
  try {
    const post = await Post.findAll();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOnePost = async (req, res) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.id} });
    if (post) {
      res.status(200).json(post);
    }else {
      res.status(404).json("Post non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const createPost = async (req, res) => {
  const {body} = req;
  const {error} = postValidation(body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    const post = await Post.create(body);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updatePost = async (req, res) => {
  const {body} = req;
  const {error} = postValidation(body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    const post = await Post.update(body, {where: {id: req.params.id}});
    if (post) {
      res.status(200).json("Post modifié");
    }else {
      res.status(404).json("Post non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.destroy({where: {id: req.params.id}});
    if (post) {
      res.status(200).json("Post supprimé");
    }else {
      res.status(404).json("Post non enregistré");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllPost,
  getOnePost,
  createPost,
  updatePost,
  deletePost
}