import express from "express";
import bookController from "../controllers/bookController.js";

const router = express.Router();

router.post("/", bookController.createBook);
router.get("/", bookController.getAllBooks);

router.get("/search/:titulo", bookController.getBookByTitle);
router.get("/categoria/:categoria", bookController.getBookByCategory);
router.put("/:id", bookController.updateBook);
router.patch("/:id/ativo", bookController.deactivateBook);
router.get("/:id", bookController.getBookById);


export default router;