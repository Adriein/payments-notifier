import { Request, Response, NextFunction } from 'express';
import { Controller } from "../../../../Shared/Infrastructure/Decorators/controller";
import { BaseController } from "../../../../Shared/Infrastructure/BaseController";
import { use } from "../../../../Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "../../../../Shared/Infrastructure/Middlewares/auth";
import { post } from "../../../../Shared/Infrastructure/Decorators/routes";
import { FindUsersQuery } from "../../Domain/Query/FindUsersQuery";
import { GetUserResponse } from "../../Application/Find/GetUserResponse";

@Controller()
export class FindUsersController extends BaseController<GetUserResponse[]> {
  @post('/users')
  @use(requireAuth)
  @use(currentUser)
  public async getAllUsers(req: Request, res: Response<{ users: GetUserResponse[] }>, next: NextFunction) {
    try {
      const filters = req.body.filters || [];
      const query = new FindUsersQuery(filters, req.currentUser!.id, req.body.page, req.body.quantity);

      const users = await this.queryBus.ask(query);

      res.status(200).send({ users });
    } catch (error) {
      next(error);
    }
  }
}
