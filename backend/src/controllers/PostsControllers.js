const models = require("../models");

// Creér un nouveau post
const createPost = async (req, res) => {
  try {
    const post = req.body;
    const [result] = await models.posts.insert(post);
    res.status(201).json({ message: "Post créer avec succès", result});
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
// Obtenir tous les posts
const getPostAll = async (req,res) => {
  try {
    const [post] = await models.posts.findAll();
    res.send(post);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// Obtenir un post par id
const getPost = async (req,res) => {
  try {
    const postId = req.params.id;
    const post = await models.posts.getById(postId);
    res.json(post);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// Mettre à jour un post par id
const updatePost = async (req,res) => {
  try {
    const postId = req.params.id;
    const updatedPost = req.body;
    await models.posts.updateById(updatedPost, postId);
    res.json({ message: "Post mis à jour avec succès"})
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// Supprimer un post par id 
const deletePost = async (req,res) => {
  try {
    const postId = req.params.id;
    await models.posts.deleteById(postId);
    res.json({ message: "Post supprimer avec succès"});
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};


module.exports = {
  createPost,
  getPostAll,
  getPost,
  updatePost,
  deletePost,
}