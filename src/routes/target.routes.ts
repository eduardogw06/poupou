import { Router } from "express";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { CreateTargetController } from "../modules/target/useCases/target/createTarget/CreateTargetController";
import { DeleteTargetController } from "../modules/target/useCases/target/deleteTarget/DeleteTargetController";
import { ListTargetController } from "../modules/target/useCases/target/listTarget/ListTargetController";
import { UpdateTargetController } from "../modules/target/useCases/target/updateTarget/UpdateTargetController";


const targetsRoutes = Router();

const createTargetController = new CreateTargetController();
const updateTargetController = new UpdateTargetController();
const deleteTargetController = new DeleteTargetController();
const listTargetController = new ListTargetController();

targetsRoutes.post("/", ensureAuthenticated, createTargetController.handle);
targetsRoutes.patch("/", ensureAuthenticated, updateTargetController.handle);
targetsRoutes.delete("/", ensureAuthenticated, deleteTargetController.handle);
targetsRoutes.get("/", ensureAuthenticated, listTargetController.handle);

export { targetsRoutes }