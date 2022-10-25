import { Request, Response } from "express";
import { container } from "tsyringe";
import { getUserIdFromAuthHeader } from "../../../../utils/getUserIdFromAuthHeader";
import { GetUserInfoUseCase } from "./GetUserInfoUseCase";

class GetUserInfoController {
    async handle(request: Request, response: Response): Promise<Response> {
        const user_id = getUserIdFromAuthHeader(request.headers.authorization);

        const getUserInfouseCase = container.resolve(GetUserInfoUseCase);

        const userInfo = await getUserInfouseCase.execute(user_id);

        return response.json(userInfo);
    }
}

export { GetUserInfoController }