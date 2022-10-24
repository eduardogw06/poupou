import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/upload";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserController } from "../modules/accounts/useCases/updateUser/UpdateUserController";
import { UpdateUserPasswordController } from "../modules/accounts/useCases/updateUserPassword/updateUserPasswordController";
import { UpdateUserPhotoController } from "../modules/accounts/useCases/updateUserPhoto/updateUserPhotoController";

const usersRoutes = Router();

const uploadPhoto = multer(uploadConfig.upload("./tmp/photo"));

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const updateUserPhotoController = new UpdateUserPhotoController();
const updateUserPasswordController = new UpdateUserPasswordController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.patch("/", ensureAuthenticated, updateUserController.handle);
usersRoutes.patch("/update-photo", uploadPhoto.single("photo"), ensureAuthenticated, updateUserPhotoController.handle);
usersRoutes.patch("/update-password", updateUserPasswordController.handle);

export { usersRoutes };
