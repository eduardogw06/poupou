
import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";
import { EmailsRepository } from "../../../system/repositories/implementations/EmailsRepository";
import { sendMail } from "../../../../utils/sendMail";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    password,
    photo,
    google_id,
    is_admin,
    dark_theme
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
      photo,
      google_id,
      is_admin,
      dark_theme
    });

    const savedUser = await this.repository.save(user);

    if (savedUser) {
      const emailsRepository = new EmailsRepository();
      const newRegisterEmail = await emailsRepository.findById(process.env.NEW_USER_EMAIL);

      if (newRegisterEmail) {
        sendMail({
          to: savedUser.email,
          from: process.env.FROM_EMAIL,
          subject: newRegisterEmail.subject,
          content: newRegisterEmail.content.replace('[name]', savedUser.name)
        });
      }

      return savedUser;
    }
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }

  async save(user: User): Promise<void> {
    await this.repository.save(user);
  }
}

export { UsersRepository };
