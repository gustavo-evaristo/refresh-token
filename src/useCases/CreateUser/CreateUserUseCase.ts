import { client } from "../../../prisma/client";
import { hash } from "bcryptjs";
import { GenerateToken } from "../../provider/GenerateToken";

interface ICreateUserRequest {
  name: string;
  username: string;
  password: string;
}

export class CreateUserUseCase {
  async execute({ name, username, password }: ICreateUserRequest) {
    // Verificar se o usuário existe
    const userAlreadyExists = await client.user.findFirst({
      where: { username },
    });

    if (userAlreadyExists) throw new Error("User Already exists");

    // Cadastrar o usuário
    const passwordHash = await hash(password, 8);

    const user = await client.user.create({
      data: { name, username, password: passwordHash },
    });

    const generateToken = new GenerateToken();

    const token = generateToken.execute(user!.id);
  
    return { user, token };
  }
}
