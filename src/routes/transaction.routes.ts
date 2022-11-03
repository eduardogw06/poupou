import { Router } from "express";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { CreateTransactionController } from "../modules/transaction/useCases/createTransaction/CreateTransactionController";
import { DeleteTransactionController } from "../modules/transaction/useCases/deleteTransaction/DeleteTransactionController";
import { UpdateTransactionController } from "../modules/transaction/useCases/updateTransaction/UpdateTransactionController";
import { ListTransactionController } from "../modules/transaction/useCases/listTransaction/ListTransactionController";

const transactionsRoutes = Router();

const createTransactionControlller = new CreateTransactionController();
const updateTransactionControlller = new UpdateTransactionController();
const deleteTransactionController = new DeleteTransactionController();
const listTransactionController = new ListTransactionController();

transactionsRoutes.post("/", ensureAuthenticated, createTransactionControlller.handle);
transactionsRoutes.patch("/", ensureAuthenticated, updateTransactionControlller.handle);
transactionsRoutes.delete("/", ensureAuthenticated, deleteTransactionController.handle);
transactionsRoutes.get("/", ensureAuthenticated, listTransactionController.handle);


export { transactionsRoutes }