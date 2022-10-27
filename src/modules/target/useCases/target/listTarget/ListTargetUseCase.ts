import { inject, injectable } from "tsyringe";
import { ITargetResponseDTO } from "../../../dtos/ITargetResponseDTO";
import { Target } from "../../../entities/Target";
import { TargetMap } from "../../../mapper/TargetMap";
import { TargetsRepository } from "../../../repositories/implementations/TargetsRepository";

interface IRequest {
    user_id: string;
    target_id?: string;
}

@injectable()
class ListTargetUseCase {
    constructor(
        @inject("TargetsRepository")
        private targetsRepository: TargetsRepository
    ) { }

    async execute({ user_id, target_id }: IRequest): Promise<ITargetResponseDTO[]> {
        let targets = [];

        if (target_id) {
            const target = await this.targetsRepository.findById(target_id);

            if (target.user_id === user_id)
                targets.push(target);
        } else {
            targets = await this.targetsRepository.list(user_id);
        }


        return targets.map((target: Target): ITargetResponseDTO => TargetMap.toDTO(target))
    }

}

export { ListTargetUseCase }