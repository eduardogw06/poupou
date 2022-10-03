import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserPhotoUseCase } from "./UpdateUserPhotoUseCase";

class UpdateUserPhotoController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { uuid } = request.user;
        const photo = request.file.filename;
        
        const updateUserAvatarUseCase = container.resolve(UpdateUserPhotoUseCase);

        await updateUserAvatarUseCase.execute({ user_id: uuid , photo});

        return response.status(204).send();
    }
}

export { UpdateUserPhotoController }