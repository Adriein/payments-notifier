import { Controller } from "../../../../Shared/Infrastructure/Decorators/controller";
import { BaseController } from "../../../../Shared/Infrastructure/BaseController";
import { NutrilogResponse } from "../../../../Shared/Application/NutrilogResponse";
import { get } from "../../../../Shared/Infrastructure/Decorators/routes";
import { use } from "../../../../Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "../../../../Shared/Infrastructure/Middlewares/auth";
import { NextFunction, Request, Response } from "express";
import { FindFiltersResponseDto } from "../../Application/FindFilters/FindFiltersResponseDto";
import { FindFiltersQuery } from "../../Application/FindFilters/FindFiltersQuery";

@Controller()
export class GetAppFiltersController extends BaseController<NutrilogResponse<FindFiltersResponseDto[]>> {
  @get('/filter')
  @use(requireAuth)
  @use(currentUser)
  public async getAppFilters(
    req: Request,
    res: Response<NutrilogResponse<FindFiltersResponseDto[]>>,
    next: NextFunction
  ) {
    try {
      const query = new FindFiltersQuery(req.currentUser!.id);

      const response = await this.queryBus.ask<NutrilogResponse<FindFiltersResponseDto[]>>(query);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
