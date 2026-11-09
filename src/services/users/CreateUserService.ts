import { prismaClient } from "../../prisma";

import { hash } from "bcryptjs";

interface CreateUserProps {
  name: string;
  cpf: string;
  email: string;
  password: string;
}

export class CreateUserService {
  async execute({ name, cpf, email, password }: CreateUserProps) {
    //  Verify if already exist user in database
    const findUser = await prismaClient.user.findFirst({
      where: {
        email: email,
        cpf: cpf,
      },
    });

    if (findUser) {
      return "User already exists";
    }

    const passwordHashed = await hash(password, 10);

    const newUser = await prismaClient.user.create({
      data: {
        cpf,
        name,
        email,
        password: passwordHashed,
      },
      select: {
        id: true,
        email: true,
        name: true,
        cpf: true,
        created_at: true,
      },
    });

    return newUser;
  }
}
