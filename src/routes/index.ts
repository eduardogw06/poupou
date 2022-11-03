import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { categoriesRoutes } from "./categories.routes";
import { targetsRoutes } from "./target.routes";
import { transactionsRoutes } from "./transaction.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use(authenticateRoutes);
router.use("/category", categoriesRoutes);
router.use("/target", targetsRoutes);
router.use("/transaction", transactionsRoutes)


export { router };