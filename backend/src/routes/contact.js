const express = require("express");

const router = express.Router();

const contactController = require("../controllers/ContactController");

router.get("/", contactController.getAllContact);
router.get("/:id", contactController.getOneContact);
router.post("/", contactController.createContact);
router.delete("/:id", contactController.deleteContact);

module.exports = router;
