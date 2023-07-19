const express = require('express');

const router = express.Router();

const commentsController = require('../controllers/commentsController');

router.get('/', commentsController.getAllComments);
router.get('/:id', commentsController.getOneComment);
router.post('/', commentsController.createComment);
router.put('/:id', commentsController.modifyComment);
router.delete('/:id', commentsController.deleteComment);

module.exports = router;