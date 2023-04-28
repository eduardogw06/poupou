import { inject, injectable } from "tsyringe";
import { TargetsRepository } from "../../../repositories/implementations/TargetsRepository";
import { Target } from "../../../entities/Target";

@injectable()
class DeleteTargetUseCase {
    constructor(
        @inject("TargetsRepository")
        private targetsRepository: TargetsRepository
    ) { }

    async execute(user_id: string, target_id: string): Promise<void> {
        const target = await this.targetsRepository.findById(user_id, target_id, true) as Target;

        await this.targetsRepository.delete(target);
    }
}

export { DeleteTargetUseCase }