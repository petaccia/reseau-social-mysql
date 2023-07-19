const express = require('express');

const router = express.Router();

const creatorController = require('../controllers/CreatorController');

router.get('/:id', creatorController.getOneCreator);
router.post('/', creatorController.createCreator);
router.put('/:id', creatorController.modifyCreator);


module.exports = router;