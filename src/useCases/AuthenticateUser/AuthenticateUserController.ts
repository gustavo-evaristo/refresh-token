import { Request, Response } from "express";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

interface IAuthenticateUserRequest {
  username: string;
  password: string;
}

export class AuthenticateUserController {
  async execute(req: Request, res: Response) {
    const { username, password }: IAuthenticateUserRequest = req.body;

    const authenticateUser = new AuthenticateUserUseCase();

    const token = await authenticateUser.execute({ username, password });

    return res.status(200).json(token);
  }
}
