import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { isEmpty } from "lodash";

export const authenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization: token } = req.headers;

  if (isEmpty(token)) res.status(401).json({ message: "No token provider" });

  console.log(token);

  try {
    verify(token as string, 'secretkey');

    return next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'Invalid Token' });
  }
};
