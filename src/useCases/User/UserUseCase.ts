import { client } from '../../../prisma/client';

interface IUserRequest {
    name: string;
    username: string;
    password: string;
}

export class UserUseCase {
  async execute({ name, username, password }: IUserRequest) {
    // Verificar se o usuário existe
    const userAlreadyExists = await client.user.findFirst({
      where: { username },
    });
  }
}
