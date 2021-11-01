import { Request, Response, NextFunction } from 'express';
import { Controller } from "../../../../Shared/Infrastructure/Decorators/controller";
import { BaseController } from "../../../../Shared/Infrastructure/BaseController";
import { use } from "../../../../Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "../../../../middlewares/auth";
import { UpdatePaymentCommand } from "../../Domain/Command/UpdatePaymentCommand";
import { put } from "../../../../Shared/Infrastructure/Decorators/routes";

@Controller()
export class UpdateUserPaymentController extends BaseController<void> {
  @put('/users/subscription/payment')
  @use(requireAuth)
  @use(currentUser)
  public async updatePayment(req: Request, res: Response, next: NextFunction) {
    try {
      await this.commandBus.dispatch(
        new UpdatePaymentCommand(
          req.body.id,
          req.body.pricingId,
          req.body.lastPaymentDate,
        )
      );

      res.status(200).send({});
    } catch (error) {
      next(error);
    }
  }
}
