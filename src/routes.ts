import { Request, Response, Router } from "express";
import { CreateUserController } from "./useCases/CreateUser/CreateUserController";
import { AuthenticateUserController } from "./useCases/AuthenticateUser/AuthenticateUserController";
import { authenticated } from "./middlewares/authenticated";

const CreateUser = new CreateUserController();
const AuthenticateUser = new AuthenticateUserController();

const routes = Router();

routes.post("/user", CreateUser.execute);
routes.post("/auth", AuthenticateUser.execute);

routes.get("/users", authenticated, (req: Request, res: Response) =>
  res.status(200).json([
    {
      name: "Gustavo",
    },
    {
      name: "Henrique",
    },
    {
      name: "Evaristo",
    },
  ])
);

export { routes };
