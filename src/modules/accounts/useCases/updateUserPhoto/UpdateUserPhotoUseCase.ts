import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    user_id: string;
    photo: string;
}

@injectable()
class UpdateUserPhotoUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ user_id, photo }: IRequest) {
        const user = await this.usersRepository.findById(user_id);

        user.photo = photo;

        await this.usersRepository.save(user);
    }
}

export { UpdateUserPhotoUseCase }