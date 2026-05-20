import express from "express";
import loanController from "../controllers/loanController.js";

const router = express.Router();

router.post("/", loanController.createLoan);
router.get("/", loanController.getAllLoans);
router.get("/ativo", loanController.getLoanByActive);
router.get("/user/:userId", loanController.getLoansByUser);
router.get("/:id", loanController.getLoanById);
router.patch("/:id/return", loanController.returnBook);
router.get("/loan/overdue", loanController.listOverdueLoans);
router.post("/:id/fine/simulate",loanController.simulatefine)
router.get("/admin/dashboard/", loanController.GeneralDashboard)
router.get("/admin/user/with-active-loans", loanController.listUsersWithActiveLoans);
export default router;