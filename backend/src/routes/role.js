const express = require('express');

const router = express.Router();

const roleController = require('../controllers/RoleController');

router.get('/', roleController.getAllRoles);
router.get('/:id', roleController.getOneRole);
router.post('/', roleController.createRole);
router.put('/:id', roleController.modifyRole);
router.delete('/:id', roleController.deleteRole);

module.exports = router;