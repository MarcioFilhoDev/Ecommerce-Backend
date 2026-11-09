import { Request, Response } from "express";
import { CreateCompanyService } from "../../services/companies/CreateCompanyService";

export class CreateCompanyController {
  async handle(req: Request, res: Response) {
    const { name, cnpj, email, password } = req.body;

    const createCompanyService = new CreateCompanyService();
    const newCompany = await createCompanyService.execute({
      name,
      cnpj,
      email,
      password,
    });

    res.status(200).json(newCompany);
  }
}
