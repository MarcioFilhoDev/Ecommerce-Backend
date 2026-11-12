import { z } from "zod";

export const CreateUserSchema = z.object({
  body: z.object({
    name: z.string("Name is missing."),
    cpf: z.string("CPF is missing."),
    email: z.email("E-mail is missing."),
    password: z.string("Password is missing."),
  }),
});

export const AuthUserSchema = z.object({
  body: z
    .object({
      cpf: z.string("CPF is missing.").optional(),
      email: z.string("E-mail is missing.").optional(),
      password: z.string("Password is missing."),
    })
    .refine((data) => Boolean(data.email) !== Boolean(data.cpf), {
      error: "Provide e-mail or CPF, not both.",
    }),
});
