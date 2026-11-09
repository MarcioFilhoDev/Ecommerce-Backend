import "dotenv/config";

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { prismaClient } from "../../prisma";

interface AuthCompanyProps {
  cnpj?: string;
  email?: string;
  password: string;
}

export class AuthCompanyService {
  async execute({ cnpj, email, password }: AuthCompanyProps) {
    const identifierMethod = cnpj ? { cnpj } : email ? { email } : undefined;

    if (!identifierMethod) {
      return "Email/CNPJ and password are necessary";
    }

    const findCompany = await prismaClient.company.findUnique({
      where: identifierMethod,
    });

    if (!findCompany) {
      return "Email/CNPJ and password are necessary";
    }

    const passwordMatch = await compare(password, findCompany.password);

    if (!passwordMatch) {
      return "Email/CNPJ and password are necessary";
    }

    const token = sign(
      {
        name: findCompany.name,
        email: findCompany.email,
      },
      process.env.JWT_SECRET as string,
      {
        subject: findCompany.id,
        expiresIn: "7d",
      },
    );

    return {
      id: findCompany.id,
      name: findCompany.name,
      email: findCompany.email,
      cnpj: findCompany.cnpj,
      token,
    };
  }
}
