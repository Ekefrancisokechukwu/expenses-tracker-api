import { Router } from "express";
import { createExpense, deleteExpense, getAllExpenses, updateExpense, } from "../controllers/expenseController.js";
const router = Router();
router.route("/").post(createExpense).get(getAllExpenses);
router.route("/:id").patch(updateExpense).delete(deleteExpense);
export default router;
//# sourceMappingURL=expenseRoute.js.map