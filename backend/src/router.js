const express= require("express")


const router = express.Router();

const userConnexion = require("./controllers/userConnexionControllers")
const userController = require("./controllers/UsersControllers")

const auth = require("./middleware/auth");
// routes User
router.get("/user", auth, userController.browse);
router.get("/user/:id", auth, userController.read);
router.post("/user", auth, userController.add);
router.put("/user/:id", auth, userController.edit);
router.delete("/user/:id", auth, userController.destroy);


router.post("/signUp", userConnexion.signUp);
router.post("/login", userConnexion.loginUser)
module.exports = router;