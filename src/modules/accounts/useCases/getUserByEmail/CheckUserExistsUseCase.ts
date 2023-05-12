import { inject, injectable } from "tsyringe";
import { IUserResponseDTO } from "../../dtos/IUserResponseDTO";
import { UserMap } from "../../mapper/UserMap";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import { AppError } from "../../../../errors/AppError";

@injectable()
class CheckUserExistsUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: UsersRepository
    ) { }
    async execute(email: string): Promise<IUserResponseDTO | null> {
        const user = await this.usersRepository.findByEmail(email);

        if (user) return UserMap.toDTO(user);
        return null;
    }
}

export { CheckUserExistsUseCase };
