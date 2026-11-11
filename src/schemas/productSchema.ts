import { string, z } from "zod";
import { Categories } from "../generated/prisma/enums";

export const ProductSchema = z.object({
  body: z.object({
    company_id: z
      .string("ID of company is missing.")
      .nonempty("ID from company is necessary."),
    code: z
      .string("Code of product is missing.")
      .nonempty("Code of product is necessary."),
    title: z
      .string("Title of product is missing.")
      .nonempty("Title of product is necessary."),
    description: z
      .string("Description of product is missing.")
      .nonempty("Description of product is necessary."),
    category: z.enum(Categories),
    quantities: z
      .number("Quantity of product is missing")
      .min(1, "Quantity of product is more than 0")
      .nonnegative("Quantity of product, can't be negative."),
    original_price: z
      .number("Original price of product is missing")
      .min(1, "Original price of product is more than 0")
      .nonnegative("Price can't be negative."),
    current_price: z
      .number("Price of product is missing")
      .min(1, "Price of product is more than 0")
      .nonnegative("Price can't be negative."),
    image: z.array(z.string()).nonempty("At least one image is necessary"),
  }),
});
