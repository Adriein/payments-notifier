import { NextFunction, Request, Response } from "express";
import { BaseController } from "../../../../Shared/Infrastructure/BaseController";
import { Controller } from "../../../../Shared/Infrastructure/Decorators/controller";
import { get } from "../../../../Shared/Infrastructure/Decorators/routes";
import { GenerateExpiredSubscriptionsReportQuery } from "../../Domain/Query/GenerateExpiredSubscriptionsReportQuery";

@Controller()
export class GenerateExpiredSubscriptionsReportController extends BaseController<void> {
  @get('/user/subscription/report')
  public async generateExpiredSubscriptionsReport(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.queryBus.ask(new GenerateExpiredSubscriptionsReportQuery());
      res.status(200).send({});
    } catch (error) {
      next(error);
    }
  }
}