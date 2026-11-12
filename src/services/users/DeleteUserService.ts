import { prismaClient } from "../../prisma";

interface DeleteUserProps {
  id: string;
}

export class DeleteUserService {
  async execute({ id }: DeleteUserProps) {
    const findUser = await prismaClient.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!findUser) {
      return "User not exist";
    }

    try {
      const deleteUser = await prismaClient.user.delete({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          created_at: true,
        },
      });

      return deleteUser;
    } catch (error) {
      console.error(error);
    }
  }
}
