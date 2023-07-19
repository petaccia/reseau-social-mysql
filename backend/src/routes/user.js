 
// Voici le code pour créer toutes les routes users
const express = require('express');

const router = express.Router();

const usersController = require('../controllers/UserController');
const upload = require('../services/multer');

router.get('/', usersController.getAllUser);
router.get('/:id', usersController.getOneUser);
router.post('/', upload.single('image'), usersController.createUser);
router.put('/:id', upload.single('image'), usersController.updateUser);
router.delete('/:id', usersController.deleteUser);


module.exports = router;