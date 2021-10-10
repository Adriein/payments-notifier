import { BaseController } from "../../../Shared/Infrastructure/BaseController";
import { NextFunction, Request, Response } from "express";
import { post } from "../../../Shared/Infrastructure/Decorators/routes";
import { SignInCommand } from "../../../Domain/Commands/Auth/SignInCommand";
import { Controller } from "../../../Shared/Infrastructure/Decorators/controller";
import jwt from 'jsonwebtoken';
import { Auth } from "../../Domain/Auth.entity";

@Controller()
export class SignInController extends BaseController<Auth> {
  @post('/signin')
  public async signIn(req: Request, res: Response<void>, next: NextFunction): Promise<void> {
    try {
      const {email, password} = req.body;

      const auth = await this.queryBus.ask(new SignInCommand(email, password));

      const userJwt = jwt.sign(
        {
          id: auth.id(),
          username: auth.name(),
        },
        process.env.JWT_KEY!
      );

      req.session = {
        jwt: userJwt,
      };
      
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}