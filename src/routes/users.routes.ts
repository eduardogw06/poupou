import { Router } from "express";
import multer from "multer";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { CheckUserExistsController } from "../modules/accounts/useCases/getUserByEmail/CheckUserExistsController";
import { GetUserInfoController } from "../modules/accounts/useCases/getUserInfo/GetUserInfoController";
import { UpdateUserController } from "../modules/accounts/useCases/updateUser/UpdateUserController";
import { UpdateUserPasswordController } from "../modules/accounts/useCases/updateUserPassword/UpdateUserPasswordController";
import { UpdateUserPhotoController } from "../modules/accounts/useCases/updateUserPhoto/UpdateUserPhotoController";
import { PasswordRecoveryController } from "../modules/accounts/useCases/passwordRecovery/PasswordRecoveryController";

const usersRoutes = Router();
const uploadPhoto = multer();

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const updateUserPhotoController = new UpdateUserPhotoController();
const updateUserPasswordController = new UpdateUserPasswordController();
const getUserInfoController = new GetUserInfoController();
const checkUserExistsController = new CheckUserExistsController();
const passwordRecoveryController = new PasswordRecoveryController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.put("/", ensureAuthenticated, updateUserController.handle);
usersRoutes.post("/update-photo", uploadPhoto.single("photo"), ensureAuthenticated, updateUserPhotoController.handle);
usersRoutes.put("/update-password", ensureAuthenticated, updateUserPasswordController.handle);
usersRoutes.get("/", ensureAuthenticated, getUserInfoController.handle);
usersRoutes.get("/check-email", checkUserExistsController.handle);
usersRoutes.post("/password-recovery", passwordRecoveryController.handle);

export { usersRoutes };
