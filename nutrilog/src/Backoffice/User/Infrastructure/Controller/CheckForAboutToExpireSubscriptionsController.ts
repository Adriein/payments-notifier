import { NextFunction, Request, Response } from "express";
import { BaseController } from "../../../../Shared/Infrastructure/BaseController";
import { Controller } from "../../../../Shared/Infrastructure/Decorators/controller";
import { get } from "../../../../Shared/Infrastructure/Decorators/routes";
import { CheckForAboutToExpireSubscriptionsQuery } from "../../Domain/Query/CheckForAboutToExpireSubscriptionsQuery";

@Controller()
export class CheckForAboutToExpireSubscriptionsController extends BaseController<void> {
  @get('/user/subscription/expire')
  public async aboutToExpire(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.queryBus.ask(new CheckForAboutToExpireSubscriptionsQuery());
      res.status(200).send({});
    } catch (error) {
      next(error);
    }
  }
}