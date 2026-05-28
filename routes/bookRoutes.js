import express from "express";
import bookController from "../controllers/bookController.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import authMiddleware from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.post("/", authMiddleware,adminMiddleware,bookController.createBook);
router.get("/", authMiddleware, bookController.getAllBooks);
router.get("/:id", authMiddleware ,bookController.getBookById);
router.get("/search/:titulo",  authMiddleware,bookController.getBookByTitle);
router.get("/categoria/:categoria", authMiddleware, adminMiddleware,bookController.getBookByCategory);
router.put("/:id", authMiddleware, adminMiddleware,bookController.updateBook);
router.patch("/:id/ativo", authMiddleware, adminMiddleware,bookController.deactivateBook)

export default router;