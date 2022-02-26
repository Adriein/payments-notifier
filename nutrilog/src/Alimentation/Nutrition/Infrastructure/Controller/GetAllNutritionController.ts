import { Controller } from "../../../../Shared/Infrastructure/Decorators/controller";
import { BaseController } from "../../../../Shared/Infrastructure/BaseController";
import { use } from "../../../../Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "../../../../Shared/Infrastructure/Middlewares/auth";
import { Request, Response, NextFunction } from "express";
import { get } from "../../../../Shared/Infrastructure/Decorators/routes";
import { GetNutritionResponse } from "../../Application/Find/GetNutritionResponse";
import { FindNutritionQuery } from "../../Domain/Query/FindNutritionQuery";

@Controller()
export class GetAllNutritionController extends BaseController<GetNutritionResponse> {
  @get('/nutrition')
  @use(requireAuth)
  @use(currentUser)
  public async getAllNutrition(
    req: Request,
    res: Response<GetNutritionResponse>,
    next: NextFunction
  ) {
    try {
      const response = await this.queryBus.ask<GetNutritionResponse>(new FindNutritionQuery(req.currentUser!.id!));

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
