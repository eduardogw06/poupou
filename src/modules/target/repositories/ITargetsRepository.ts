import { ICreateTargetsDTO } from "../dtos/ICreateTargetsDTO";
import { IUpdateTargetsDTO } from "../dtos/IUpdateTargetDTO";
import { Target } from "../entities/Target";

interface ITargetsRepository {
    create(data: ICreateTargetsDTO): Promise<void>;
    list(user_id: string): Promise<Target[]>;
    findById(id: string): Promise<Target>;
    save(target: IUpdateTargetsDTO): Promise<void>;
    delete(target: Target): Promise<void>;
}

export { ITargetsRepository };
