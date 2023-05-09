import { container } from "tsyringe";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRepository";
import { IEmailsRepository } from "../../modules/system/repositories/IEmailsRepository";
import { IMenusRepository } from "../../modules/system/repositories/IMenusRepository";
import { EmailsRepository } from "../../modules/system/repositories/implementations/EmailsRepository";
import { MenusRepository } from "../../modules/system/repositories/implementations/MenusRepository";
import { ICategoriesRepository } from "../../modules/target/repositories/ICategoriesRepository";
import { ITargetsRepository } from "../../modules/target/repositories/ITargetsRepository";
import { CategoriesRepository } from "../../modules/target/repositories/implementations/CategoriesRepository";
import { TargetsRepository } from "../../modules/target/repositories/implementations/TargetsRepository";
import { ITransactionsRepository } from "../../modules/transaction/repositories/ITransactionsRepository";
import { TransactionsRepository } from "../../modules/transaction/repositories/implementations/TransactionsRepository";

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

container.registerSingleton<IMenusRepository>(
    "MenusRepository",
    MenusRepository
)

container.registerSingleton<IEmailsRepository>(
    "EmailsRepository",
    EmailsRepository
)