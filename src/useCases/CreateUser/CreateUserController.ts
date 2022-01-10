import { Request, Response } from "express";
import { CreateUserUseCase } from './CreateUserUseCase';

interface ICreateUserRequest {
    name: string;
    username: string;
    password: string;
}

export class CreateUserController {
    async execute(req: Request, res: Response) {
        const { name, username, password }: ICreateUserRequest = req.body;

        const CreateUser = new CreateUserUseCase(); 

        const user = await CreateUser.execute({ name, username, password });

        return res.status(200).json(user);
    };  
}