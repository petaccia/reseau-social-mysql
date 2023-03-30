const express= require("express")


const router = express.Router();

const connexionController = require("./controllers/ConnexionControllers");
// const userController = require("./controllers/UsersControllers");
// const postController = require("./controllers/PostsControllers.js");
// const commentController = require("./controllers/CommentsControllers");
// const likeController = require("./controllers/LikesControllers");

// // routes User
// router.get("/user", userController.browse);
// router.get("/find/:userId", userController.read);
// router.post("/user", userController.add);
// router.put("/user/:id", userController.edit);
// router.delete("/user/:id", userController.destroy);

// // routes posts
// router.get("/post", postController.browse);
// router.get("/find/:postId", postController.read);
// router.post("/post", postController.add);
// router.put("/post/:id", postController.edit);
// router.delete("/post/:id", postController.destroy);

// // routes comments
// router.get("/comment",commentController.browse);
// router.get("/find/:commentId", commentController.read);
// router.post("/comment", commentController.add);
// router.put("/comment/:id", commentController.edit);
// router.delete("/comment/:id", commentController.destroy);

// // routes likes
// router.get("/like", likeController.browse);
// router.get("/find/:likeId", likeController.read);
// router.post("/like", likeController.add);
// router.put("/like/:id", likeController.edit);
// router.delete("/like/:id", likeController.destroy);

// routes connexion
router.post("/register", connexionController.register);
router.post("/login", connexionController.login)
router.post("/logout", connexionController.login)
module.exports = router;