import { inject, injectable } from "tsyringe";
import { MenusRepository } from "../../../repositories/implementations/MenusRepository";
import { IMenuResponseDTO } from "../../../dtos/IMenuResponse.DTO";
import { UsersRepository } from "../../../../accounts/repositories/implementations/UsersRepository";
import { MenuMap } from "../../../mapper/MenuMap";
import { Menu } from "../../../entities/Menu";

@injectable()
class ListMenuUseCase {
    constructor(
        @inject("MenusRepository")
        private menuRepository: MenusRepository
    ) { }
    async execute(user_id: string, activeOnly: boolean = false): Promise<IMenuResponseDTO[]> {
        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(user_id);
        let adminOnly = false;

        if (user && user.is_admin) {
            adminOnly = user.is_admin;
        }

        const menus = await this.menuRepository.list(activeOnly, adminOnly);

        return menus.map((menu: Menu): IMenuResponseDTO => MenuMap.toDTO(menu));
    }
}

export { ListMenuUseCase };
