import { Request, Response } from "express";
import { GetProductService } from "../../services/products/GetProductService";

export class GetProductController {
  async hanlde(req: Request, res: Response) {
    try {
      const getProductService = new GetProductService();

      const productList = await getProductService.execute();

      res.status(200).json(productList);
    } catch (error) {
      res.status(400).json({ error: "Error to load products" });
      console.error(error);
    }
  }
}
