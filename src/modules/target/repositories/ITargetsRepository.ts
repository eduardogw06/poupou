import { ICreateTargetsDTO } from "../dtos/ICreateTargetsDTO";
import { ISelectedTarget, ITargetProgress } from "../dtos/ITargetResponseDTO";
import { Target } from "../entities/Target";

interface ITargetsRepository {
    create(data: ICreateTargetsDTO): Promise<void>;
    list(user_id: string): Promise<ISelectedTarget[]>;
    findById(user_id: string, id: string, onlyTarget: boolean): Promise<ISelectedTarget | Target>;
    findByCategory(category_id: string): Promise<ISelectedTarget[]>;
    save(target: Target): Promise<void>;
    delete(target: Target): Promise<void>;
    listTargetProgress(user_id: string): Promise<ITargetProgress[]>
}

export { ITargetsRepository };
