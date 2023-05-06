import { inject, injectable } from "tsyringe";
import { ISelectedTarget, ITargetProgress, ITargetResponseDTO } from "../../../dtos/ITargetResponseDTO";
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
        let targetsProgress = [];

        if (target_id) {
            const target = await this.targetsRepository.findById(user_id, target_id, false) as ISelectedTarget;

            if (target.targets_user_id === user_id)
                targets.push(target);
        } else {
            targets = await this.targetsRepository.list(user_id);
        }

        if (targets) {
            targetsProgress = await this.targetsRepository.listTargetProgress(user_id);
        }

        return targets.map((target: ISelectedTarget): ITargetResponseDTO => {
            const filteredProgress = targetsProgress.find((progress: ITargetProgress) => progress.targets_uuid === target.targets_uuid)
            return TargetMap.toDTO(target, filteredProgress);
        })
    }
}

export { ListTargetUseCase };
