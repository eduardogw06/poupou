import { Router } from "express";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { CreateAutomaticInvestmentController } from "../modules/transaction/useCases/automaticInvestment/createAutomaticInvestment/CreateAutomaticInvestmentController";
import { DeleteAutomaticInvestmentController } from "../modules/transaction/useCases/automaticInvestment/deleteAutomaticInvestment/DeleteAutomaticInvestmentController";
import { ListAutomaticInvestmentController } from "../modules/transaction/useCases/automaticInvestment/listAutomaticInvestment/ListAutomaticInvestmentController";
import { UpdateAutomaticInvestmentController } from "../modules/transaction/useCases/automaticInvestment/updateAutomaticInvestment/UpdateAutomaticInvestmentController";

const automaticInvestmentsRoutes = Router();

const createAutomaticInvestmentControlller = new CreateAutomaticInvestmentController();
const updateAutomaticInvestmentControlller = new UpdateAutomaticInvestmentController();
const deleteAutomaticInvestmentController = new DeleteAutomaticInvestmentController();
const listAutomaticInvestmentController = new ListAutomaticInvestmentController();



automaticInvestmentsRoutes.post("/", ensureAuthenticated, createAutomaticInvestmentControlller.handle);
automaticInvestmentsRoutes.put("/", ensureAuthenticated, updateAutomaticInvestmentControlller.handle);
automaticInvestmentsRoutes.delete("/", ensureAuthenticated, deleteAutomaticInvestmentController.handle);
automaticInvestmentsRoutes.get("/", ensureAuthenticated, listAutomaticInvestmentController.handle);


export { automaticInvestmentsRoutes };
