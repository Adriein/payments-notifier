import { Controller } from "../../../../Shared/Infrastructure/Decorators/controller";
import { BaseController } from "../../../../Shared/Infrastructure/BaseController";
import { get } from "../../../../Shared/Infrastructure/Decorators/routes";
import { use } from "../../../../Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "../../../../Shared/Infrastructure/Middlewares/auth";
import { NextFunction, Request, Response } from "express";
import { GetUserQuery } from "../../Domain/Query/GetUserQuery";
import { FindUserResponse } from "../../Application/Find/FindUserResponse";
import { User } from "../../Domain/Entity/User.entity";

@Controller()
export class GetUserController extends BaseController<FindUserResponse> {
  @get('/user')
  @use(requireAuth)
  @use(currentUser)
  public async getUser(req: Request, res: Response<FindUserResponse>, next: NextFunction): Promise<void> {
    try {
      const user = await this.queryBus.ask<FindUserResponse>(new GetUserQuery(req.body.id));
      
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
}