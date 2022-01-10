import { client } from "../../../prisma/client";
import { isEmpty } from "lodash";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateUserRequest {
    username: string;
    password: string;
}
export class AuthenticateUserUseCase {

  async execute({ username, password }: IAuthenticateUserRequest) {
    const user = await client.user.findFirst({ where: { username } })

    if (isEmpty(user)) throw new Error('User not exists');

    const passwordMatch = await compare(password, user!.password)

    if (!passwordMatch) throw new Error('invalid password');

    const token = sign({}, 'secretkey', {
        subject: user!.id,
        expiresIn: '20s',
    })

    return token;

  }
}
