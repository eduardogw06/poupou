import { Router } from "express";
import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/authenticateUserController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post("/login", authenticateUserController.handle);

export { authenticateRoutes };
