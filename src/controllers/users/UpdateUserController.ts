import { Request, Response } from "express";
import { UpdateUserService } from "../../services/users/UpdateUserService";

export class UpdateUserController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    if (user_id) {
      const { name, password, phone_number, postal_code, address } = req.body;

      const updateUserService = new UpdateUserService();

      const updatedUser = await updateUserService.execute({
        user_id: user_id,
        address: address,
        name: name,
        password: password,
        phone_number: phone_number,
        postal_code: postal_code,
      });

      res.status(200).json(updatedUser);
    } else {
      res.status(400).json({ error: "user not authenticated" });
    }
  }
}
