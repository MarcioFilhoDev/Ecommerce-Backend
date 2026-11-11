import { Categories } from "../../generated/prisma/enums";
import { prismaClient } from "../../prisma";

interface CreateProductProps {
  company_id: string;
  code: string;
  title: string;
  description: string;
  category: Categories;
  quantities: number;
  original_price: number;
  current_price: number;
  image: string[];
}

export class CreateProductService {
  async execute({
    code,
    company_id,
    category,
    current_price,
    description,
    original_price,
    quantities,
    title,
    image,
  }: CreateProductProps) {
    //  Verify if already exist user in database
    const findProduct = await prismaClient.product.findFirst({
      where: {
        AND: [{ code }, { company_id }],
      },
    });

    if (findProduct) {
      return "This products already exists";
    }

    try {
      const newProduct = await prismaClient.product.create({
        data: {
          code: code,
          company_id: company_id,
          category: category,
          current_price: current_price,
          original_price: original_price,
          title: title,
          description: description,
          quantities: quantities,
          images: image,
        },
        select: {
          id: true,
          code: true,
          company_id: true,
          category: true,
          current_price: true,
          title: true,
          description: true,
          comments: true,
          images: true,
          original_price: true,
          has_discount: true,
          quantities: true,
          status: true,
          created_at: true,
        },
      });

      return newProduct;
    } catch (error) {
      console.error(error);
      throw new Error("Create product error");
    }
  }
}
