const express= require("express")


const router = express.Router();

const userConnexion = require("./controllers/userConnexionControllers")
const userController = require("./controllers/UsersControllers")

const auth = require("./middleware/auth");
const multer = require("./middleware/multer");
// routes User
router.get("/users", auth, userController.browse);
router.get("/users/fiche/", auth, userController.read);
router.post("/users", auth, multer, userController.add);
router.put("/users/:id", auth, userController.edit);
router.delete("/users/:id", auth, userController.destroy);


router.post("/signUp", userConnexion.signUp);
router.post("/login", userConnexion.loginUser)
module.exports = router;