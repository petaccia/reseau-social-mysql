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
router.get("/", adminController.getAllAdmin);
router.get("/:id", adminController.getOneAdmin);
router.post("/", adminController.createAdmin);
router.put("/:id", adminController.updateAdmin);
router.delete("/:id", adminController.deleteAdmin);

// Routes d'adminFamily
router.get("/", adminFamilyController.getAllAdminFamily);
router.get("/:id", adminFamilyController.getOneAdminFamily);
router.post("/", adminFamilyController.createAdminFamily);
router.put("/:id", adminFamilyController.updateAdminFamily);
router.delete("/:id", adminFamilyController.deleteAdminFamily);

// Routes de comments
router.get("/", commentsController.getAllComments);
router.get("/:id", commentsController.getOneComment);
router.post("/", commentsController.createComment);
router.put("/:id", commentsController.updateComment);
router.delete("/:id", commentsController.deleteComment);

// Routes de connection
router.post("/signup", connectionController.register);
router.post("/login", LoginLimiter, connectionController.login);

router.get("/:id", connectionController.approveConnection);
router.put("/:id", connectionController.approveConnection);

// Routes de family
router.get("/", familyController.getAllFamily);
router.get("/:id", familyController.getOneFamily);
router.post("/", upload.single("image"), familyController.createFamily);
router.put("/:id", upload.single("image"), familyController.updateFamily);
router.delete("/:id", familyController.deleteFamily);

// Routes de contact
router.get("/", contactController.getAllContact);
router.get("/:id", contactController.getOneContact);
router.post("/", contactController.createContact);
router.delete("/:id", contactController.deleteContact);

// Routes de creator
router.get("/:id", creatorController.getOneCreator);
router.post("/", creatorController.createCreator);
router.put("/:id", creatorController.updateCreator);

// Routes de like
router.get("/", likeController.getAllLike);
router.get("/:id", likeController.getOneLike);
router.post("/", likeController.createLike);
router.put("/:id", likeController.updateLike);
router.delete("/:id", likeController.deleteLike);

// Routes de post
router.get("/", postController.getAllPost);
router.get("/:id", postController.getOnePost);
router.post("/", postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

// Routes de role
router.get("/", roleController.getAllRoles);
router.get("/:id", roleController.getOneRole);
router.post("/", roleController.createRole);
router.put("/:id", roleController.updateRole);
router.delete("/:id", roleController.deleteRole);

// Routes de user
router.get("/", usersController.getAllUser);
router.get("/:id", usersController.getOneUser);
router.post("/", upload.single("image"), usersController.createUser);
router.put("/:id", upload.single("image"), usersController.updateUser);
router.delete("/:id", usersController.deleteUser);


module.exports = router;





