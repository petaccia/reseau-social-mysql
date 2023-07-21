const express = require("express");

const router = express.Router();

const familyController = require("../controllers/FamilyController");
const upload = require("../services/multer");

router.get("/", familyController.getAllFamily);
router.get("/:id", familyController.getOneFamily);
router.post("/", upload.single("image"), familyController.createFamily);
router.put("/:id", upload.single("image"), familyController.updateFamily);
router.delete("/:id", familyController.deleteFamily);

module.exports = router;
