const express= require("express")


const router = express.Router();

const userConnexion = require("./controllers/userConnexionControllers")


router.post("/signUp", userConnexion.signUp);
router.post("/login", userConnexion.loginUser)
module.exports = router;