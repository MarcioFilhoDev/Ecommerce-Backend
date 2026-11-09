import { Request, Response } from "express";
import { CreateUserService } from "../../services/users/CreateUserService";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, cpf, email, password } = req.body;

    const createUserService = new CreateUserService();

    const newUser = await createUserService.execute({
      cpf,
      email,
      name,
      password,
    });

    res.status(200).json(newUser);
  }
}
