import { container } from "tsyringe";
import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { ICategoriesRepository } from "../../modules/target/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/target/repositories/implementations/CategoriesRepository";
import { TargetsRepository } from "../../modules/target/repositories/implementations/TargetsRepository";
import { ITargetsRepository } from "../../modules/target/repositories/ITargetsRepository";
import { TransactionsRepository } from "../../modules/transaction/repositories/implementations/TransactionsRepository";
import { ITransactionsRepository } from "../../modules/transaction/repositories/ITransactionsRepository";

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
)

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
)

container.registerSingleton<ITargetsRepository>(
    "TargetsRepository",
    TargetsRepository
)

container.registerSingleton<ITransactionsRepository>(
    "TransactionsRepository",
    TransactionsRepository
)