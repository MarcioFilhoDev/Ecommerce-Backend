import { Request, Response, NextFunction } from "express";

import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({
      error: "Token was not provided",
    });
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(
      token as string,
      process.env.JWT_SECRET as string,
    ) as Payload;

    req.user_id = sub;

    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      error: "Invalid Token",
    });
  }
}
