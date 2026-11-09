import { Request, Response } from "express";
import { AuthCompanyService } from "../../services/companies/AuthCompanyService";

export class AuthCompanyController {
  async handle(req: Request, res: Response) {
    const { cnpj, email, password } = req.body;

    if (cnpj && email) {
      return res
        .status(400)
        .json({ error: "Utilize apenas e-mail ou apenas CNPJ." });
    }

    if (!cnpj && !email) {
      return res
        .status(400)
        .json({ error: "E-mail ou CNPJ são obrigatórios." });
    }

    const authCompanyService = new AuthCompanyService();

    const company = await authCompanyService.execute({
      cnpj,
      email,
      password,
    });

    return res.status(200).json({ message: "Company authenticated", company });
  }
}
