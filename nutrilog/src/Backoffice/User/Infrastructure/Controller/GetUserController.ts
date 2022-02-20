import { Controller } from "../../../../Shared/Infrastructure/Decorators/controller";
import { BaseController } from "../../../../Shared/Infrastructure/BaseController";
import { get } from "../../../../Shared/Infrastructure/Decorators/routes";
import { use } from "../../../../Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "../../../../Shared/Infrastructure/Middlewares/auth";
import { NextFunction, Request, Response } from "express";
import { GetUserProfileQuery } from "../../Application/GetUserProfile/GetUserProfileQuery";
import { FindTenantClientsResponse } from "../../Application/FindTenantClients/FindTenantClientsResponse";
import { User } from "../../Domain/Entity/User.entity";

@Controller()
export class GetUserController extends BaseController<FindTenantClientsResponse> {
  @get('/user')
  @use(requireAuth)
  @use(currentUser)
  public async getUser(req: Request, res: Response<FindTenantClientsResponse>, next: NextFunction): Promise<void> {
    try {
      const user = await this.queryBus.ask<FindTenantClientsResponse>(new GetUserProfileQuery(req.body.id));

      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
}