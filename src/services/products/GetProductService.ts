import { prismaClient } from "../../prisma";

export class GetProductService {
  async execute() {
    try {
      const products = await prismaClient.product.findMany({
        select: {
          id: true,
          title: true,
          code: true,
          category: true,
          comments: true,
          company_id: true,
          current_price: true,
          has_discount: true,
          description: true,
          images: true,
          original_price: true,
          quantities: true,
          status: true,
          total_stars: true,
          total_users_apply: true,
        },
      });

      return products;
    } catch (error) {
      console.error(error);
      return "Error to load products";
    }
  }
}
