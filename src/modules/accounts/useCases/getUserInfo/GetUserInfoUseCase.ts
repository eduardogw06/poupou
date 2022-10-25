import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUserResponseDTO } from "../../dtos/IUserResponseDTO";
import { UserMap } from "../../mapper/UserMap";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";

@injectable()
class GetUserInfoUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: UsersRepository
    ) { }
    async execute(user_id: string): Promise<IUserResponseDTO> {
        const user = await this.usersRepository.findById(user_id);
        return UserMap.toDTO(user);
    }
}

export { GetUserInfoUseCase }