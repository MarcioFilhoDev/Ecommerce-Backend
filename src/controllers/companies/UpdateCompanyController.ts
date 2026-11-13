import { Request, Response } from "express";
import { UpdateCompanyService } from "../../services/companies/UpdateUserService";

export class UpdateCompanyController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    if (user_id) {
      const { name, password, postal_code, address } = req.body;

      const updateCompanyService = new UpdateCompanyService();

      const updatedCompany = await updateCompanyService.execute({
        user_id: user_id,
        address: address,
        name: name,
        password: password,
        postal_code: postal_code,
      });

      res.status(200).json(updatedCompany);
    } else {
      res.status(400).json({ error: "user not authenticated" });
    }
  }
}
