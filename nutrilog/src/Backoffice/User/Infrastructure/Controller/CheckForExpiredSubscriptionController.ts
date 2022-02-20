import { NextFunction, Request, Response } from "express";
import { BaseController } from "../../../../Shared/Infrastructure/BaseController";
import { Controller } from "../../../../Shared/Infrastructure/Decorators/controller";
import { get } from "../../../../Shared/Infrastructure/Decorators/routes";
import { CheckForExpiredSubscriptionsCommand } from "../../Application/CheckForExpiredSubscriptions/CheckForExpiredSubscriptionsCommand";

@Controller()
export class CheckForExpiredSubscriptionController extends BaseController<void> {
  @get('/user/subscription/expired')
  public async checkForExpiredSubscriptions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.queryBus.ask(new CheckForExpiredSubscriptionsCommand());
      res.status(200).send({});
    } catch (error) {
      next(error);
    }
  }
}