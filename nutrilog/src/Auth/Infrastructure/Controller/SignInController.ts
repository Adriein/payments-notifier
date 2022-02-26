import { BaseController } from "../../../Shared/Infrastructure/BaseController";
import { NextFunction, Request, Response } from "express";
import { post } from "../../../Shared/Infrastructure/Decorators/routes";
import { Controller } from "../../../Shared/Infrastructure/Decorators/controller";
import jwt from 'jsonwebtoken';
import { Auth } from "../../Domain/Auth.entity";
import { SigninQuery } from "../../Domain/Query/SigninQuery";

@Controller()
export class SignInController extends BaseController<Auth> {
  @post('/signin')
  public async signIn(req: Request, res: Response<any>, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      const auth = await this.queryBus.ask<Auth>(new SigninQuery(email, password));

      const userJwt = jwt.sign(
        {
          id: auth.id().value,
          username: auth.name(),
        },
        process.env.JWT_KEY!
      );

      req.session = {
        jwt: userJwt,
      };

      res.status(200).send({ id: auth.id().value, username: auth.name() });
    } catch (error) {
      next(error);
    }
  }
}