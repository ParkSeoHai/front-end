const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const logger = require("../logs/logger");
const { verifyToken, verifyAdmin } = require("../middlewares/auth.middleware");

// Public routes
router.post("/login", userController.login);
router.post("/register", userController.create);
router.post('/logout', userController.logout);
router.get("/me", verifyToken, userController.getCurrentUser);
router.post("/update-password", verifyToken, userController.updatePassword);
router.put("/update-profile", verifyToken, userController.updateProfile);

// Social login routes
router.post("/auth/google", userController.loginWithGoogle);
router.post("/auth/facebook", userController.loginWithFacebook);

// Protected routes
router.get("/", verifyToken, verifyAdmin, userController.getAll);
router.get("/:id", verifyToken, userController.getById);
router.put("/:id", verifyToken, userController.update);
router.delete("/:id", verifyToken, verifyAdmin, userController.delete);

module.exports = router;
