const express = require('express');
const router = express.Router();
const connectionController = require('../controllers/ConnectionController');
const LoginLimiter = require('../middleware/LoginLimiter');

router.post('/register', connectionController.register);
router.post('/login', LoginLimiter, connectionController.login);

router.get('/:id', connectionController.approveConnection);
router.put('/:id', connectionController.approveConnection);

module.exports = router;