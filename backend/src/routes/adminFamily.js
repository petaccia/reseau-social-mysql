const express = require("express");

const router = express.Router();

const adminFamilyController = require("../controllers/adminFamilyController");

router.get("/", adminFamilyController.getAllAdminFamily);
router.get("/:id", adminFamilyController.getOneAdminFamily);
router.post("/", adminFamilyController.createAdminFamily);
router.put("/:id", adminFamilyController.updateAdminFamily);
router.delete("/:id", adminFamilyController.deleteAdminFamily);

module.exports = router;