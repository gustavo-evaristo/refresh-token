import { Request, Response } from "express";
import { RefreshTokenUseCase } from "./RefreshTokenUserUseCase";

export class RefreshTokenUserController {
  async execute(req: Request, res: Response) {
    const { refresh_token } = req.body;

    const refreshToken = new RefreshTokenUseCase();

    const token = await refreshToken.execute(refresh_token);

    return res.status(200).json(token);
  }
}
