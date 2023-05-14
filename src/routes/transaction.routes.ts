import { Router } from "express";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { CreateTransactionController } from "../modules/transaction/useCases/transaction/createTransaction/CreateTransactionController";
import { UpdateTransactionController } from "../modules/transaction/useCases/transaction/updateTransaction/UpdateTransactionController";
import { DeleteTransactionController } from "../modules/transaction/useCases/transaction/deleteTransaction/DeleteTransactionController";
import { ListTransactionController } from "../modules/transaction/useCases/transaction/listTransaction/ListTransactionController";

const transactionsRoutes = Router();

const createTransactionControlller = new CreateTransactionController();
const updateTransactionControlller = new UpdateTransactionController();
const deleteTransactionController = new DeleteTransactionController();
const listTransactionController = new ListTransactionController();

transactionsRoutes.post("/", ensureAuthenticated, createTransactionControlller.handle);
transactionsRoutes.put("/", ensureAuthenticated, updateTransactionControlller.handle);
transactionsRoutes.delete("/", ensureAuthenticated, deleteTransactionController.handle);
transactionsRoutes.get("/", ensureAuthenticated, listTransactionController.handle);


export { transactionsRoutes }