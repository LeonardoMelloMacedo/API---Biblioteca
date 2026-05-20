import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.get("/me", authMiddleware, userController.getMe)
router.get("/", userController.getAllUsers);
 router.get("/:id", userController.getUserById);
 router.put("/:id", userController.updateUser);
 router.patch("/:id/ativo", userController.deactivateUser);

export default router;