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

export const UpdateUserSchema = z.object({
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
    phone_number: z
      .string()
      .min(4, "Phone number must be has more than 4 digits")
      .optional(),
    postal_code: z
      .string()
      .min(3, "Postal code must be has more than 3 character")
      .optional(),
  }),
});
