import { Request, Response } from "express";
import { AuthCompanyService } from "../../services/companies/AuthCompanyService";

export class AuthCompanyController {
  async handle(req: Request, res: Response) {
    try {
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

      if (!password) {
        return res.status(400).json({
          error: "A senha é obrigatória.",
        });
      }

      const authCompanyService = new AuthCompanyService();

      const company = await authCompanyService.execute({
        cnpj,
        email,
        password,
      });

      return res.status(200).json({
        message: "Company authenticated",
        company,
      });
    } catch (error) {
      return res.status(401).json({
        error:
          error instanceof Error
            ? error.message
            : "Erro ao autenticar empresa.",
      });
    }
  }
}
