import { prismaClient } from "../../prisma";

import { hash } from "bcryptjs";

interface UpdateCompanyProps {
  user_id: string;
  name?: string;
  password?: string;
  postal_code?: string;
  address?: string;
}

export class UpdateCompanyService {
  async execute({
    user_id,
    address,
    name,
    password,
    postal_code,
  }: UpdateCompanyProps) {
    try {
      const updateCompany = await prismaClient.company.update({
        where: {
          id: user_id,
        },
        data: {
          ...(address !== undefined && { address }),
          ...(name !== undefined && { name }),
          ...(postal_code !== undefined && { postal_code }),
          ...(password && { password: await hash(password, 10) }),
        },
        select: {
          id: true,
          name: true,
          address: true,
          postal_code: true,
        },
      });

      return updateCompany;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar dados do usuário.");
    }
  }
}
