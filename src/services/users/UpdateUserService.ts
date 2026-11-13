import { tr } from "zod/v4/locales/index.js";
import { prismaClient } from "../../prisma";

import { hash } from "bcryptjs";

interface UpdateUserProps {
  user_id: string;
  name?: string;
  password?: string;
  phone_number?: string;
  postal_code?: string;
  address?: string;
}

export class UpdateUserService {
  async execute({
    user_id,
    address,
    name,
    password,
    phone_number,
    postal_code,
  }: UpdateUserProps) {
    try {
      const updateUser = await prismaClient.user.update({
        where: {
          id: user_id,
        },
        data: {
          ...(address !== undefined && { address }),
          ...(name !== undefined && { name }),
          ...(phone_number !== undefined && { phone_number }),
          ...(postal_code !== undefined && { postal_code }),
          ...(password && { password: await hash(password, 10) }),
        },
        select: {
          id: true,
          name: true,
          address: true,
          phone_number: true,
          postal_code: true,
        },
      });

      return updateUser;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar dados do usuário.");
    }
  }
}
