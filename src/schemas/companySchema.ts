import { z } from "zod";

export const CreateCompanySchema = z.object({
  body: z.object({
    name: z.string("Name is missing."),
    cnpj: z.string("CNPJ is missing."),
    email: z.email("E-mail is missing."),
    password: z.string("Password is missing."),
  }),
});

export const AuthCompanySchema = z.object({
  body: z
    .object({
      cnpj: z.string("CNPJ is missing.").optional(),
      email: z.string("E-mail is missing.").optional(),
      password: z.string("Password is missing."),
    })
    .refine((data) => Boolean(data.email) !== Boolean(data.cnpj), {
      error: "Provide e-mail or CPF, not both.",
    }),
});

export const UpdateCompanySchema = z.object({
  body: z.object({
    address: z
      .string()
      .min(5, "Address must be has more than 5 characters")
      .optional(),
    name: z
      .string()
      .min(3, "Name must be has more than 3 characters")
      .optional(),
    password: z
      .string()
      .min(6, "Passord must be has more than 5 characters")
      .optional(),
    postal_code: z
      .string()
      .min(3, "Postal code must be has more than 3 character")
      .optional(),
  }),
});
