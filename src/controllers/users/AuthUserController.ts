import e, { Request, Response } from "express";
import { AuthUserService } from "../../services/users/AuthUserService";

export class AuthUserController {
  async handle(req: Request, res: Response) {
    const { cpf, email, password } = req.body;

    const authUserSerivce = new AuthUserService();

    if (cpf && email) {
      res.status(400).json({ error: "Utilize apenas e-mail ou apenas CPF." });
    }

    if (!cpf && !email) {
      res.status(400).json({ error: "E-mail ou CPF são obrigatórios." });
    }

    const user = await authUserSerivce.execute({
      cpf: cpf,
      email: email,
      password: password,
    });

    res.status(200).json({ message: "User authenticated", user: user });
  }
}
