import { Router } from "express";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { CreateCategoryController } from "../modules/target/useCases/category/createCategory/CreateCategoryController";
import { DeleteCategoryController } from "../modules/target/useCases/category/deleteCategory/DeleteCategoryController";
import { ListCategoryController } from "../modules/target/useCases/category/listCategory/ListCategoryController";
import { UpdateCategoryController } from "../modules/target/useCases/category/updateCategory/UpdateCategoryController";

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();
const updateCategoryController = new UpdateCategoryController();
const deleteCategoryController = new DeleteCategoryController();

categoriesRoutes.post("/", ensureAuthenticated, createCategoryController.handle);
categoriesRoutes.get("/", ensureAuthenticated, listCategoryController.handle);
categoriesRoutes.put("/", ensureAuthenticated, updateCategoryController.handle);
categoriesRoutes.delete("/", ensureAuthenticated, deleteCategoryController.handle);

export { categoriesRoutes }