import { Router } from "express";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { ListMenuController } from "../modules/system/useCases/listMenu/ListMenuController";


const systemRoutes = Router();

const listMenuController = new ListMenuController();

systemRoutes.get("/menu", ensureAuthenticated, listMenuController.handle);

export { systemRoutes };
