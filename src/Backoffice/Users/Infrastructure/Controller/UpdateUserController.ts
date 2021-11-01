import { Request, Response, NextFunction } from 'express';
import { Controller } from "../../../../Shared/Infrastructure/Decorators/controller";
import { BaseController } from "../../../../Shared/Infrastructure/BaseController";
import { use } from "../../../../Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "../../../../middlewares/auth";
import { UpdateUserCommand } from "../../Domain/Command/UpdateUserCommand";
import { put } from "../../../../Shared/Infrastructure/Decorators/routes";

@Controller()
export class UpdateUserController extends BaseController<void> {
  @put('/users')
  @use(requireAuth)
  @use(currentUser)
  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      await this.commandBus.dispatch(
        new UpdateUserCommand(
          req.body.id,
          req.body.username,
          req.body.email,
          req.body.pricingId,
          req.body.lastPaymentDate,
          req.currentUser!.id
        )
      );

      res.status(200).send({});
    } catch (error) {
      next(error);
    }
  }
}
