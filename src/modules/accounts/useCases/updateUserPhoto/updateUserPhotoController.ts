import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserPhotoUseCase } from "./UpdateUserPhotoUseCase";

class UpdateUserPhotoController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { uuid } = request.user;
        const photo = request.file.filename;

        const updateUsePhotoUseCase = container.resolve(UpdateUserPhotoUseCase);

        await updateUsePhotoUseCase.execute({ user_id: uuid, photo });

        return response.status(204).send();
    }
}

export { UpdateUserPhotoController }