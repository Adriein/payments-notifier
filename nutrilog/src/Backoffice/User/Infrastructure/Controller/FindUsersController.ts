import { Request, Response, NextFunction } from 'express';
import { Controller } from "../../../../Shared/Infrastructure/Decorators/controller";
import { BaseController } from "../../../../Shared/Infrastructure/BaseController";
import { use } from "../../../../Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "../../../../Shared/Infrastructure/Middlewares/auth";
import { post } from "../../../../Shared/Infrastructure/Decorators/routes";
import { FindUsersQuery } from "../../Domain/Query/FindUsersQuery";
import { FindUserResponse } from "../../Application/Find/FindUserResponse";
import { NutrilogResponse } from "../../../../Shared/Application/NutrilogResponse";
import { UsersMetadata } from "../../Application/Find/UsersMetadata";

@Controller()
export class FindUsersController extends BaseController<NutrilogResponse<FindUserResponse[], UsersMetadata>> {
  @post('/users')
  @use(requireAuth)
  @use(currentUser)
  public async getAllUsers(
    req: Request,
    res: Response<NutrilogResponse<FindUserResponse[], UsersMetadata>>,
    next: NextFunction
  ) {
    try {
      const filters = req.body.filters || [];
      const query = new FindUsersQuery(filters, req.currentUser!.id, req.body.page, req.body.quantity);

      const response = await this.queryBus.ask<NutrilogResponse<FindUserResponse[], UsersMetadata>>(query);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
