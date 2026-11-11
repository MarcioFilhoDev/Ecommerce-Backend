import { compare } from "bcryptjs";
import { prismaClient } from "../../prisma";
import { tr } from "zod/v4/locales/index.js";

interface DeleteUserProps {
  id: string;
  password: string;
}

export class DeleteUserService {
  async execute({ id, password }: DeleteUserProps) {
    const findUser = await prismaClient.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!findUser) {
      return "User not exist";
    }

    const passwordMatch = await compare(password, findUser.password);

    if (passwordMatch) {
      try {
        const deleteUser = await prismaClient.user.delete({
          where: {
            id: id,
          },
          select: {
            id: true,
            name: true,
            email: true,
          },
        });

        return deleteUser;
      } catch (error) {
        console.error(error);
      }
    }
  }
}
