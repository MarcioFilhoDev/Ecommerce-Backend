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
