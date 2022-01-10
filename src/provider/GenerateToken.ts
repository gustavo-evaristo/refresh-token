import { sign } from "jsonwebtoken";

export class GenerateToken {
  execute(id: string) {
    const token = sign({}, "secretkey", {
      subject: id,
      expiresIn: "1000s",
    });

    return token;
  }
}
