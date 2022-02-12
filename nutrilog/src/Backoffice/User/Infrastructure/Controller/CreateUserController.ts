import { NextFunction, Request, Response } from "express";
import { CreateUserCommand } from "../../Domain/Command/CreateUserCommand";
import { BaseController } from "../../../../Shared/Infrastructure/BaseController";
import { Controller } from "../../../../Shared/Infrastructure/Decorators/controller";
import { post } from "../../../../Shared/Infrastructure/Decorators/routes";
import { use } from "../../../../Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "../../../../Shared/Infrastructure/Middlewares/auth";

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
          req.body.pricingId,
          req.body.lastPaymentDate,
          req.currentUser!.id!
        )
      );

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  }
}