const express = require('express');

const router = express.Router();


const likeController = require('../controllers/LikeController.js');

router.get('/', likeController.getAllLike);
router.get('/:id', likeController.getOneLike);
router.post('/', likeController.createLike);
router.put('/:id', likeController.modifyLike);
router.delete('/:id', likeController.deleteLike);

module.exports = router;