import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserPhotoUseCase } from "./UpdateUserPhotoUseCase";
import { getUserIdFromAuthHeader } from "../../../../utils/getUserIdFromAuthHeader";

class UpdateUserPhotoController {
    async handle(request: Request, response: Response): Promise<Response> {
        const user_id = getUserIdFromAuthHeader(request.headers.authorization);
        const photo = request.file;

        if (photo) {
            const buffer = Buffer.from(photo.buffer);
            const base64Photo = buffer.toString("base64");

            const updateUsePhotoUseCase = container.resolve(UpdateUserPhotoUseCase);
            await updateUsePhotoUseCase.execute({ user_id, base64Photo });

            return response.status(204).send();
        }
    }
}

export { UpdateUserPhotoController }