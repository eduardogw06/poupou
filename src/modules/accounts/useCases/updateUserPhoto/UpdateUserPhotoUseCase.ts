import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    user_id: string;
    base64Photo: string;
}

@injectable()
class UpdateUserPhotoUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ user_id, base64Photo }: IRequest) {
        const user = await this.usersRepository.findById(user_id);

        user.photo = base64Photo;

        await this.usersRepository.save(user);
    }
}

export { UpdateUserPhotoUseCase }