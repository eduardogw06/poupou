import { inject, injectable } from "tsyringe";
import { TransactionsRepository } from "../../../repositories/implementations/TransactionsRepository";
import { ICreateTransactionDTO } from "../../../dtos/ICreateTransactionDTO";
import { AppError } from "@errors/AppError";
import { TargetsRepository } from "@modules/target/repositories/implementations/TargetsRepository";
import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";

@injectable()
class CreateTransactionUseCase {
    constructor(
        @inject("TransactionsRepository")
        private transactionsRepository: TransactionsRepository
    ) { }

    async execute({
        user_id,
        target_id,
        type,
        amount,
        date
    }: ICreateTransactionDTO): Promise<void> {
        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(user_id);

        if (!user) throw new AppError("Usuário não encontrado.");

        if (Number(amount) < 10) throw new AppError("O valor mínimo para um aporte é de R$ 10,00.");

        const targetsRepository = new TargetsRepository();
        const target = await targetsRepository.findById(user_id, target_id);

        if (!target) throw new AppError("Selecione o objetivo a ser investido.");

        await this.transactionsRepository.create({
            user_id,
            target_id,
            type,
            amount,
            date
        });
    }
}

export { CreateTransactionUseCase }