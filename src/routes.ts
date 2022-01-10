import { Router } from "express";
import { CreateUserController } from "./useCases/CreateUser/CreateUserController";
import { AuthenticateUserController } from './useCases/AuthenticateUser/AuthenticateUserController'

const CreateUser = new CreateUserController();
const AuthenticateUser = new AuthenticateUserController();

const routes = Router();

routes.post("/user", CreateUser.execute);
routes.post("/auth", AuthenticateUser.execute);

export { routes };
