import { Controller } from "../../../../Shared/Infrastructure/Decorators/controller";
import { BaseController } from "../../../../Shared/Infrastructure/BaseController";
import { get } from "../../../../Shared/Infrastructure/Decorators/routes";
import { use } from "../../../../Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "../../../../Shared/Infrastructure/Middlewares/auth";
import { NextFunction, Request, Response } from "express";
import { NutrilogResponse } from "../../../../Shared/Application/NutrilogResponse";
import { GetTotalClientsQuery } from "../../Application/GetTotalClients/GetTotalClientsQuery";

@Controller()
export class GetTotalClientsController extends BaseController {
  @get('/client/total')
  @use(requireAuth)
  @use(currentUser)
  public async getTotalClients(
    req: Request,
    res: Response<NutrilogResponse<number>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await this.queryBus.ask<NutrilogResponse<number>>(new GetTotalClientsQuery(req.currentUser!.id));

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}