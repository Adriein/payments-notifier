import { BaseController } from "../../../Shared/Infrastructure/BaseController";
import { NextFunction, Request, Response } from "express";
import { RegisterAdminCommand } from "../../Domain/Command/RegisterAdminCommand";
import { post } from "../../../Shared/Infrastructure/Decorators/routes";
import { Controller } from "../../../Shared/Infrastructure/Decorators/controller";
import jwt from 'jsonwebtoken';
import { SigninQuery } from "../../Domain/Query/SigninQuery";
import { Auth } from "../../Domain/Auth.entity";

@Controller()
export class RegisterAdminController extends BaseController<Auth> {
  @post('/register')
  public async register(req: Request, res: Response<any>, next: NextFunction): Promise<void> {
    try {
      await this.commandBus.dispatch(
        new RegisterAdminCommand(req.body.name, req.body.email, req.body.password)
      );

      const auth = await this.queryBus.ask(new SigninQuery(req.body.email, req.body.password));

      const userJwt = jwt.sign(
        {
          id: auth.id(),
          username: auth.name(),
        },
        process.env.JWT_KEY!
      );

      // Store it on session object
      req.session = {
        jwt: userJwt,
      };

      res.status(201).send({ id: auth.id(), username: auth.name() });
    } catch (error) {
      next(error);
    }
  }
}