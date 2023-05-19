import { inject, injectable } from "tsyringe";
import { TransactionsRepository } from "../../../repositories/implementations/TransactionsRepository";
import { AppError } from "@errors/AppError";
import { TargetsRepository } from "@modules/target/repositories/implementations/TargetsRepository";

interface IRequest {
    user_id: string;
    transaction_id: string;
    target_id: string;
    type_id: string;
    amount: number;
    date: Date;
}


@injectable()
class UpdateTransactionUseCase {
    constructor(
        @inject("TransactionsRepository")
        private transactionsRepository: TransactionsRepository
    ) { }

    async execute({
        user_id,
        transaction_id,
        target_id,
        type_id,
        amount,
        date
    }: IRequest): Promise<void> {
        const transaction = await this.transactionsRepository.findById(user_id, transaction_id, true);
        if (!transaction) throw new AppError("Usuário não encontrado ou aporte não pertence ao usuário informado.");

        const targetsRepository = new TargetsRepository();
        const target = await targetsRepository.findById(user_id, target_id);
        if (!target) throw new AppError("Selecione o objetivo a ser investido.");

        if (Number(amount) < 10) throw new AppError("O valor mínimo para um aporte é de R$ 10,00.");

        transaction.target_id = target_id ?? transaction.target_id;
        transaction.type_id = type_id ?? transaction.type_id;
        transaction.amount = amount ?? transaction.amount;
        transaction.date = date ?? transaction.date;

        await this.transactionsRepository.save(transaction);
    }
}

export { UpdateTransactionUseCase }