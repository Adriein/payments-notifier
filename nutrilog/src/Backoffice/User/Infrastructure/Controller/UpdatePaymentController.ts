import { Request, Response, NextFunction } from 'express';
import { Controller } from "../../../../Shared/Infrastructure/Decorators/controller";
import { BaseController } from "../../../../Shared/Infrastructure/BaseController";
import { use } from "../../../../Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "../../../../Shared/Infrastructure/Middlewares/auth";
import { RenewSubscriptionCommand } from "../../Application/RenewSubscription/RenewSubscriptionCommand";
import { put } from "../../../../Shared/Infrastructure/Decorators/routes";

@Controller()
export class UpdateUserPaymentController extends BaseController<void> {
  @put('/user/subscription/renew')
  @use(requireAuth)
  @use(currentUser)
  public async renewSubscription(req: Request, res: Response, next: NextFunction) {
    try {
      await this.commandBus.dispatch(
        new RenewSubscriptionCommand(
          req.body.clientId,
          req.body.pricingId,
          req.body.paymentDate,
        )
      );

      res.status(200).send({});
    } catch (error) {
      next(error);
    }
  }
}
