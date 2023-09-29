const express = require("express");

const router = express.Router();

const adminFamilyController = require("./controllers/AdminFamilyController");
const commentsController = require("./controllers/CommentsController");
const familyController = require("./controllers/FamilyController");
const contactController = require("./controllers/ContactController");
const likeController = require("./controllers/LikeController");
const postController = require("./controllers/PostController");
const usersController = require("./controllers/UserController");
const eventController = require("./controllers/EventController");
const statsController = require("./controllers/StatsController");
const messageController = require("./controllers/MessageController");
const passwordController = require("./controllers/PasswordController");
const emailController = require("./controllers/EmailController");

const authController = require("./controllers/AuthController");

const LoginLimiter = require("./middleware/LoginLimiter");
const upload = require("./services/multer");

// Les middlewares
const setStatusReadBaseOrigin = require("./middleware/StatusRead");
const {
  authenticateJWT,
  requireRole,
//   checkUserStatus,
} = require("./middleware/auth");

// Routes d'authentification
router.post("/signupAdmin", authController.signupAdminFamily);
router.post("/login", LoginLimiter, authController.loginUnified);
router.post("/signup", authController.signupUser);

// Protéger les routes utiliser par l'adminFamily et l'utilisateur
router.use(authenticateJWT);
// router.use(checkUserStatus);

// Routes de family
router.get("/family", familyController.getAllFamily);
router.get("/family/:id", familyController.getOneFamily);
router.put(
  "/family/:id",
  upload.single("image"),
  familyController.updateFamily
);
router.delete("/family/:id", familyController.deleteFamily);

// Routes de user
// obtenir tous les utilisateurs en attente de validation
router.get("/user", usersController.getAllUser);
router.get("/user/:id", usersController.getOneUser);
router.post("/user", upload.single("image"), usersController.createUser);
router.put("/user/:id", upload.single("image"), usersController.updateUser);
router.delete("/user/:id", usersController.deleteUser);

// Routes de password
router.get("/password", passwordController.verifyPassword);
router.put("/password", passwordController.updatePassword);

// Routes de email
router.get("/email", emailController.verifyEmail);
router.put("/email", emailController.updateEmail);

// Routes de post
router.get("/post", postController.getAllPost);
router.get("/post/:id", postController.getOnePost);
router.post("/post", postController.createPost);
router.put("/post/:id", postController.updatePost);
router.delete("/post/:id", postController.deletePost);

// Routes de comments
router.get("/comments", commentsController.getAllComments);
router.get("/comments/:id", commentsController.getOneComment);
router.post("/comments", commentsController.createComment);
router.put("/comments/:id", commentsController.updateComment);
router.delete("/comments/:id", commentsController.deleteComment);

// Routes de contact
router.get("/contact", contactController.getAllContact);
router.get("/contact/:id", contactController.getOneContact);
router.post("/contact", contactController.createContact);
router.delete("/contact/:id", contactController.deleteContact);

// Routes d'évênements
router.get("/event", eventController.getAllEvents);
router.get("/event/:id", eventController.getOneEvent);
router.post("/event", eventController.createEvent);
router.put("/event/:id", eventController.updateEvent);
router.delete("/event/:id", eventController.deleteEvent);

// Routes de like
router.get("/like", likeController.getAllLike);
router.get("/like/:id", likeController.getOneLike);
router.post("/like", likeController.createLike);
router.put("/like/:id", likeController.updateLike);
router.delete("/like/:id", likeController.deleteLike);

// Routes de message
router.get("/message", messageController.getAllMessages);
router.get("/message/:id", messageController.getMessage);
router.post(
  "/message",
  setStatusReadBaseOrigin,
  messageController.createMessage
);
router.put("/message/:id", messageController.updateMessage);
router.delete("/message/:id", messageController.deleteMessage);
router.delete("/messages", messageController.AllDeleteMessage);
router.put("/message/:id/view", messageController.updateViewStatus);

// Protéger les routes utiliser seulement par l'adminFamily
router.use("/adminfamily", requireRole("adminFamily"));

// Routes d'adminFamily
router.get("/adminfamily", adminFamilyController.getAllAdminFamily);
router.get("/adminfamily/:id", adminFamilyController.getOneAdminFamily);
router.post("/adminfamily", adminFamilyController.createAdminFamily);
router.put("/adminfamily/:id", adminFamilyController.updateAdminFamily);
router.delete("/adminfamily/:id", adminFamilyController.deleteAdminFamily);
// pour accepter ou refuser un utilisateur de la famille
router.put("/adminfamily/user/accept", adminFamilyController.acceptRequest);

// Route pour obtenir tous les utilisateurs en attente de validation
router.get("/adminfamily/user/pending/", usersController.getPendingUsers);

// Route pour créer une famille
router.post("/adminfamily/family", familyController.createFamily);

// Routes de statFamily
router.get("/stat/FamilyMemberCount/:id", statsController.getFamilyMemberCount);
router.get("/stat/recentPostCount/:id", statsController.getRecentPostCount);
router.get(
  "/stat/upcomingEventCount/:id",
  statsController.getUpcomingEventCount
);
module.exports = router;
