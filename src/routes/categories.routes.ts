import { Router } from "express";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { CreateCategoryController } from "../modules/target/useCases/createCategory/CreateCategoryController";
import { DeleteCategoryController } from "../modules/target/useCases/deleteCategory/DeleteCategoryController";
import { ListCategoryController } from "../modules/target/useCases/listCategory/ListCategoryController";
import { UpdateCategoryController } from "../modules/target/useCases/updateCategory/UpdateCategoryController";

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();
const updateCategoryController = new UpdateCategoryController();
const deleteCategoryController = new DeleteCategoryController();

categoriesRoutes.post("/", ensureAuthenticated, createCategoryController.handle);
categoriesRoutes.get("/", ensureAuthenticated, listCategoryController.handle);
categoriesRoutes.patch("/", ensureAuthenticated, updateCategoryController.handle);
categoriesRoutes.delete("/", ensureAuthenticated, deleteCategoryController.handle);

export { categoriesRoutes }