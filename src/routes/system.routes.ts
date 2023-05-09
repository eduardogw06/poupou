import { Router } from "express";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { ListEmailController } from "../modules/system/useCases/email/listMail/ListEmailController";
import { UpdateEmailController } from "../modules/system/useCases/email/updateEmail/UpdateEmailController";
import { ListMenuController } from "../modules/system/useCases/menu/listMenu/ListMenuController";


const systemRoutes = Router();

const listMenuController = new ListMenuController();
const listEmailController = new ListEmailController();
const updateEmailController = new UpdateEmailController();

systemRoutes.get("/menu", ensureAuthenticated, listMenuController.handle);

systemRoutes.get("/email", ensureAuthenticated, listEmailController.handle);
systemRoutes.put("/email", ensureAuthenticated, updateEmailController.handle);

export { systemRoutes };
