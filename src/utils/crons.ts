import { container } from "tsyringe";
import { CreateScheduledTransactionsUseCase } from "../modules/transaction/useCases/automaticInvestment/createScheduledTransactions/createScheduledTransactionsUseCase";

const crons = (): void => {
    const createScheduledTransactionsUseCase = container.resolve(CreateScheduledTransactionsUseCase);
    createScheduledTransactionsUseCase.execute();
};

export { crons }