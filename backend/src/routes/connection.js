const express = require('express');
const router = express.Router();
const connectionController = require('../controllers/connectionController');
const LoginLimiter = require('../middleware/loginLimiter');

router.post('/register', connectionController.register);
router.post('/login', LoginLimiter, connectionController.login);

router.get('/:id', connectionController.approveConnection);
router.put('/:id', connectionController.approveConnection);

module.exports = router;