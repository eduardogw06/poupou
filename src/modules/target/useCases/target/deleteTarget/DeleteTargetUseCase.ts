import { inject, injectable } from "tsyringe";
import { TargetsRepository } from "../../../repositories/implementations/TargetsRepository";

@injectable()
class DeleteTargetUseCase {
    constructor(
        @inject("TargetsRepository")
        private targetsRepository: TargetsRepository
    ) { }

    async execute(target_id: string): Promise<void> {
        const target = await this.targetsRepository.findById(target_id);

        await this.targetsRepository.delete(target);
    }
}

export { DeleteTargetUseCase }