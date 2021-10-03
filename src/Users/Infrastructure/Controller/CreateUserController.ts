import { Controller } from "../../../Shared/Infrastructure/Decorators/controller";
import { BaseController } from "../../../Shared/Infrastructure/BaseController";
import { post } from "../../../Shared/Infrastructure/Decorators/routes";
import { use } from "../../../Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "../../../middlewares/auth";
import { NextFunction, Request, Response } from "express";
import { CreateUserCommand } from "../../Domain/Command/CreateUserCommand";

@Controller()
export class CreateUserController extends BaseController<void> {
  @post('/user')
  @use(requireAuth)
  @use(currentUser)
  public async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.commandBus.dispatch(
        new CreateUserCommand(
          req.body.username,
          req.body.email,
          req.body.pricing,
          req.body.lastPaymentDate,
          req.currentUser!.id!
        )
      );

      res.status(200).send({});
    } catch (error) {
      next(error);
    }
  }
}