import { Request, Response } from "express";
import { CreateProductService } from "../../services/products/CreateProductService";

export class CreateProductController {
  async handle(req: Request, res: Response) {
    const {
      company_id,
      code,
      title,
      description,
      category,
      quantities,
      original_price,
      current_price,
      image,
    } = req.body;

    const createProductService = new CreateProductService();

    const newProduct = await createProductService.execute({
      code,
      company_id,
      current_price,
      description,
      original_price,
      quantities,
      category,
      title,
      image,
    });

    res.status(200).json({ message: "product created", newProduct });
  }
}
