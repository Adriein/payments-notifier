import { Controller } from "../../../../Shared/Infrastructure/Decorators/controller";
import { BaseController } from "../../../../Shared/Infrastructure/BaseController";
import { get } from "../../../../Shared/Infrastructure/Decorators/routes";
import { use } from "../../../../Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "../../../../Shared/Infrastructure/Middlewares/auth";
import { NextFunction, Request, Response } from "express";
import { GetClientProfileQuery } from "../../Application/GetClientProfile/GetClientProfileQuery";
import { NutrilogResponse } from "../../../../Shared/Application/NutrilogResponse";
import { GetClientProfileResponse } from "../../Application/GetClientProfile/GetClientProfileResponse";

@Controller()
export class GetClientProfileController extends BaseController {
  @get('/client/:id/profile')
  @use(requireAuth)
  @use(currentUser)
  public async getUser(
    req: Request,
    res: Response<NutrilogResponse<GetClientProfileResponse>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const profile = await this.queryBus.ask<NutrilogResponse<GetClientProfileResponse>>(new GetClientProfileQuery(req.params.id));

      res.status(200).send(profile);
    } catch (error) {
      next(error);
    }
  }
}