import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddlewares.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, userController.getMe);
router.get("/", authMiddleware,adminMiddleware,userController.getAllUsers);
router.get("/:id", authMiddleware, adminMiddleware,userController.getUserById);
router.put("/:id", userController.updateUser);
router.patch("/:id/ativo", userController.deactivateUser);
router.put("/me/gelado", authMiddleware, userController.updateMe);
// router.get("/", authMiddleware, adminMiddleware, userController);

export default router;