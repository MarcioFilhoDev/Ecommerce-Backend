import "dotenv/config";

import { compare } from "bcryptjs";
import { prismaClient } from "../../prisma";
import { sign } from "jsonwebtoken";

interface AuthUserProps {
  cpf?: string;
  email?: string;
  password: string;
}

export class AuthUserService {
  async execute({ cpf, email, password }: AuthUserProps) {
    //  Verifying if user has recorded on database
    const findUser = await prismaClient.user.findFirst({
      where: {
        cpf: cpf!,
        email: email!,
      },
    });

    if (!findUser) {
      return "Email/CPF and password is necessary";
    }

    const passwordMatch = await compare(password, findUser.password);

    if (!passwordMatch) {
      return "Email/CPF and password is necessary";
    }

    const token = sign(
      {
        name: findUser.name,
        email: findUser.email,
      },
      process.env.JWT_SECRET as string,
      {
        subject: findUser.id,
        expiresIn: "7d",
      },
    );

    return {
      id: findUser.id,
      name: findUser.name,
      email: findUser.email,
      cpf: findUser.cpf,
      token: token,
    };
  }
}
