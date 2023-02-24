const express= require("express")


const router = express.Router();

const userConnexion = require("./controllers/userConnexionControllers")


router.post("/signUp", userConnexion.signUp)
module.exports = router;