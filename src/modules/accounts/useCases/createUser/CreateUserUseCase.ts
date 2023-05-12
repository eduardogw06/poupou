import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserResponseDTO } from "../../dtos/IUserResponseDTO";
import { UserMap } from "../../mapper/UserMap";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({
    name,
    email,
    password,
    photo,
    google_id,
    is_admin = false,
    dark_theme = true
  }: ICreateUserDTO): Promise<IUserResponseDTO> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("O usuário já existe no sistema. Tente novamente com um novo e-mail.");
    }

    const passwordHash = await hash(password, 8);

    const createdUser = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      photo,
      google_id,
      is_admin,
      dark_theme
    });

    return UserMap.toDTO(createdUser);
  }
}

export { CreateUserUseCase };
