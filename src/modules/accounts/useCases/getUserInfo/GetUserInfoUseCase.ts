import { inject, injectable } from "tsyringe";
import { IUserResponseDTO } from "../../dtos/IUserResponseDTO";
import { UserMap } from "../../mapper/UserMap";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import { TransactionRepository } from "typeorm";
import { TransactionsRepository } from "../../../transaction/repositories/implementations/TransactionsRepository";
import { Achievements, getAchievements } from "../../../../utils/getAchivements";
import { acchievementConfigs } from "../../../../config/acchievementConfigs";

@injectable()
class GetUserInfoUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: UsersRepository
    ) { }
    async execute(user_id: string): Promise<IUserResponseDTO> {
        const transactionsRepository = new TransactionsRepository();
        const transactionsTotal = await transactionsRepository.getTransactionTotal(user_id);
        const achievements: Achievements = getAchievements(transactionsTotal, acchievementConfigs);

        const user = await this.usersRepository.findById(user_id);

        return UserMap.toDTO(user, achievements);
    }
}

export { GetUserInfoUseCase };
