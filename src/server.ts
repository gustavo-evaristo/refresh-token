import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import { routes } from "./routes";

const app = express();

app.use(express.json());

app.use(routes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) =>
  res.status(400).json({
    message: error.message,
  })
);

app.listen(3333, () => console.log("server is running"));
