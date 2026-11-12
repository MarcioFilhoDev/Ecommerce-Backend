import { Request, Response } from "express";
import { DeleteUserService } from "../../services/users/DeleteUserService";

export class DeleteUserController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const deleteUserService = new DeleteUserService();

    const deleteUser = await deleteUserService.execute({
      id: user_id,
    });

    res.status(200).json({ message: "User deleted with sucess.", deleteUser });
  }
}
