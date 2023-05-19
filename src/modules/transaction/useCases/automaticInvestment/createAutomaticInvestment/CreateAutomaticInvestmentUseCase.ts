import { inject, injectable } from "tsyringe";
import { ICreateAutomaticInvesmentDTO } from "../../../dtos/ICreateAutomaticInvesmentDTO";
import { AutomaticInvestmentsRepository } from "../../../repositories/implementations/AutomaticInvestmentsRepository";
import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { AppError } from "@errors/AppError";
import { TargetsRepository } from "@modules/target/repositories/implementations/TargetsRepository";

@injectable()
class CreateAutomaticInvestmentUseCase {
    constructor(
        @inject("AutomaticInvestmentsRepository")
        private automaticInvestmentsRepository: AutomaticInvestmentsRepository
    ) { }

    async execute({
        user_id,
        target_id,
        amount,
        day,
    }: ICreateAutomaticInvesmentDTO): Promise<void> {
        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(user_id);

        if (!user) throw new AppError("Usuário não encontrado.");

        if (Number(amount) < 10) throw new AppError("O valor mínimo para um aporte é de R$ 10,00.");

        const targetsRepository = new TargetsRepository();
        const target = await targetsRepository.findById(user_id, target_id);

        if (!target) throw new AppError("Selecione o objetivo a ser investido.");

        await this.automaticInvestmentsRepository.create({
            user_id,
            target_id,
            amount,
            day
        });
    }
}

export { CreateAutomaticInvestmentUseCase };
