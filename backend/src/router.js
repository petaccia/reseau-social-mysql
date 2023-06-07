const express= require("express")


const router = express.Router();

const connexionController = require("./controllers/ConnexionControllers");
const userController = require("./controllers/UsersControllers");
const postController = require("./controllers/PostsControllers.js");
const commentController = require("./controllers/CommentsControllers");
const likeController = require("./controllers/LikesControllers");
const verificationInfo = require("./controllers/VerificationController");


// // routes User
router.get("/user", userController.browse);
router.get("/user/:id", userController.read);
router.post("/user", userController.add);
router.put("/user/:id", userController.edit);
router.delete("/user/:id", userController.destroy);

// // routes posts
router.get("/post", postController.getPostAll);
router.get("/post/:id", postController.getPost);
router.post("/post", postController.createPost);
router.put("/post/:id", postController.updatePost);
router.delete("/post/:id", postController.deletePost);

// // routes comments
router.get("/comment", commentController.getCommentAll);
router.get("/comment/:id", commentController.getComment);
router.post("/comment", commentController.createComment);
router.put("/comment/:id", commentController.updateComment);
router.delete("/comment/:id", commentController.deleteComment);

// // routes likes
router.get("/like", likeController.getLikeAll);
router.get("/like/:id", likeController.getLike);
router.post("/like", likeController.createLike);
router.put("/like/:id", likeController.updateLike);
router.delete("/like/:id", likeController.deleteLike);

// routes connexion
router.post("/register", connexionController.register);
router.post("/login", connexionController.login)
router.post("/logout", connexionController.login)

// routes de verifications d'information
router.get("/verifInfo/:id", verificationInfo.getVerificationInfoById);
router.post("/verifInfo", verificationInfo.createVerificationInfo);
router.put("/verifInfo/:id", verificationInfo.updateVerificationInfoById);



module.exports = router;


