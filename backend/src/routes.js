const express = require("express");

const router = express.Router();

const adminController = require("./controllers/AdminController");
const adminFamilyController = require("./controllers/AdminFamilyController");
const commentsController = require("./controllers/CommentsController");
const connectionController = require("./controllers/ConnectionController");
const familyController = require("./controllers/FamilyController");
const contactController = require("./controllers/ContactController");
const creatorController = require("./controllers/CreatorController");
const likeController = require("./controllers/LikeController");
const postController = require("./controllers/PostController");
const roleController = require("./controllers/RoleController");
const usersController = require("./controllers/UserController");

const LoginLimiter = require("./middleware/LoginLimiter");
const upload = require("./services/multer");




// Routes d'admin
router.get("/admin", adminController.getAllAdmin);
router.get("/admin/:id", adminController.getOneAdmin);
router.post("/admin", adminController.createAdmin);
router.put("/admin/:id", adminController.updateAdmin);
router.delete("/admin/:id", adminController.deleteAdmin);

// Routes d'adminFamily
router.get("/adminFamily", adminFamilyController.getAllAdminFamily);
router.get("/adminFamily/:id", adminFamilyController.getOneAdminFamily);
router.post("/adminFamily", adminFamilyController.createAdminFamily);
router.put("/adminFamily/:id", adminFamilyController.updateAdminFamily);
router.delete("/adminFamily/:id", adminFamilyController.deleteAdminFamily);

// Routes de comments
router.get("/comments", commentsController.getAllComments);
router.get("/comments/:id", commentsController.getOneComment);
router.post("/comments", commentsController.createComment);
router.put("/comments/:id", commentsController.updateComment);
router.delete("/comments/:id", commentsController.deleteComment);

// Routes de connection
router.post("/signup", connectionController.register);
router.post("/login", LoginLimiter, connectionController.login);

router.get("/:id", connectionController.approveConnection);
router.put("/:id", connectionController.approveConnection);

// Routes de family
router.get("/family", familyController.getAllFamily);
router.get("/family/:id", familyController.getOneFamily);
router.post("/family", upload.single("image"), familyController.createFamily);
router.put("/family/:id", upload.single("image"), familyController.updateFamily);
router.delete("/family/:id", familyController.deleteFamily);

// Routes de contact
router.get("/contact", contactController.getAllContact);
router.get("/contact/:id", contactController.getOneContact);
router.post("/contact", contactController.createContact);
router.delete("/contact/:id", contactController.deleteContact);

// Routes de creator
router.get("/creator/:id", creatorController.getOneCreator);
router.post("/creator", creatorController.createCreator);
router.put("/creator/:id", creatorController.updateCreator);

// Routes de like
router.get("/like", likeController.getAllLike);
router.get("/like/:id", likeController.getOneLike);
router.post("/like", likeController.createLike);
router.put("/like/:id", likeController.updateLike);
router.delete("/like/:id", likeController.deleteLike);

// Routes de post
router.get("/post", postController.getAllPost);
router.get("/post/:id", postController.getOnePost);
router.post("/post", postController.createPost);
router.put("/post/:id", postController.updatePost);
router.delete("/post/:id", postController.deletePost);

// Routes de role
router.get("/role", roleController.getAllRoles);
router.get("/role/:id", roleController.getOneRole);
router.post("/role", roleController.createRole);
router.put("/role/:id", roleController.updateRole);
router.delete("/role/:id", roleController.deleteRole);

// Routes de user
router.get("/user", usersController.getAllUser);
router.get("/user/:id", usersController.getOneUser);
router.post("/user", upload.single("image"), usersController.createUser);
router.put("/user/:id", upload.single("image"), usersController.updateUser);
router.delete("/user/:id", usersController.deleteUser);


module.exports = router;





