import { Request, Response } from "express";
import { DeleteUserService } from "../../services/users/DeleteUserService";

export class DeleteUserController {
  async handle(req: Request, res: Response) {
    const { user_id, password } = req.body;

    const deleteUserService = new DeleteUserService();

    const deleteUser = await deleteUserService.execute({
      id: user_id,
      password: password,
    });

    res.status(200).json({ message: "User deleted with sucess.", deleteUser });
  }
}
