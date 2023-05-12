import { Request, Response } from "express";
import { container } from "tsyringe";
import { CheckUserExistsUseCase } from "./CheckUserExistsUseCase";

class CheckUserExistsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.query;

        const checkUserExistsUseCase = container.resolve(CheckUserExistsUseCase);
        const userInfo = await checkUserExistsUseCase.execute(email as string);

        return response.json({
            user_exists: userInfo !== null,
            user_id: userInfo?.uuid
        });
    }
}

export { CheckUserExistsController };
