import { client } from "../../../prisma/client";
import { isEmpty } from "lodash";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";
import { GenerateToken } from "../../provider/GenerateToken";

interface IAuthenticateUserRequest {
  username: string;
  password: string;
}
export class AuthenticateUserUseCase {
  async execute({ username, password }: IAuthenticateUserRequest) {
    const user = await client.user.findFirst({ where: { username } });

    if (isEmpty(user)) throw new Error("User not exists");

    const passwordMatch = await compare(password, user!.password);

    if (!passwordMatch) throw new Error("invalid password");

    const generateRefreshToken = new GenerateRefreshToken();

    const generateToken = new GenerateToken();

    const token = generateToken.execute(user!.id);

    const refreshToken = await generateRefreshToken.execute(user!.id);

    return { token, refreshToken };
  }
}
