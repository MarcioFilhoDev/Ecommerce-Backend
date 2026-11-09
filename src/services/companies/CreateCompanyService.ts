import { hash } from "bcryptjs";
import { prismaClient } from "../../prisma";

interface CreateCompanyProps {
  name: string;
  cnpj: string;
  email: string;
  password: string;
}

export class CreateCompanyService {
  async execute({ name, cnpj, email, password }: CreateCompanyProps) {
    const existingCompany = await prismaClient.company.findFirst({
      where: {
        OR: [{ cnpj }, { email }],
      },
    });

    if (existingCompany) {
      return "Company already exists";
    }

    const passwordHashed = await hash(password, 10);

    try {
      const newCompany = await prismaClient.company.create({
        data: {
          name,
          cnpj,
          email,
          password: passwordHashed,
        },
        select: {
          id: true,
          name: true,
          cnpj: true,
          email: true,
          created_at: true,
        },
      });

      return newCompany;
    } catch (error) {
      console.error(error);
      throw new Error("Create company error");
    }
  }
}
