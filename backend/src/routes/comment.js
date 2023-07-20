const express = require('express');

const router = express.Router();

const commentsController = require('../controllers/CommentsController');

router.get('/', commentsController.getAllComments);
router.get('/:id', commentsController.getOneComment);
router.post('/', commentsController.createComment);
router.put('/:id', commentsController.updateComment);
router.delete('/:id', commentsController.deleteComment);

module.exports = router;