import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, photo, googleId: google_id, is_admin, dark_theme } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      name,
      email,
      password,
      photo,
      google_id,
      is_admin,
      dark_theme
    });

    return response.status(201).send(user);
  }
}

export { CreateUserController };
