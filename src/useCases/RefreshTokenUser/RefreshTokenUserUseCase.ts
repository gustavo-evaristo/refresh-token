import { isEmpty } from "lodash";
import { client } from "../../../prisma/client";
import { GenerateToken } from "../../provider/GenerateToken";

export class RefreshTokenUseCase {
  async execute(refresh_token: string) {
    const refreshToken = await client.refreshToken.findFirst({
      where: { id: refresh_token },
    });

    if (isEmpty(refreshToken)) throw new Error("Refresh Token invalid");

    const generateRefreshToken = new GenerateToken();

    const token = generateRefreshToken.execute(refreshToken!.userId)

    return token
  }
}
