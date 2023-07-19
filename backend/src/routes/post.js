const express = require('express');

const router = express.Router();

const postController = require('../controllers/PostController');

router.get('/', postController.getAllPost);
router.get('/:id', postController.getOnePost);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;