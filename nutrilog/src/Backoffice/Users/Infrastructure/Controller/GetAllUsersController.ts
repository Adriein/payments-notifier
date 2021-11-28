import { Request, Response, NextFunction } from 'express';
import { Controller } from "../../../../Shared/Infrastructure/Decorators/controller";
import { BaseController } from "../../../../Shared/Infrastructure/BaseController";
import { use } from "../../../../Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "../../../../Shared/Infrastructure/Middlewares/auth";
import { post } from "../../../../Shared/Infrastructure/Decorators/routes";
import { GetAllUsersQuery } from "../../Domain/Query/GetAllUsersQuery";
import { GetUserResponse } from "../../Application/Find/GetUserResponse";

@Controller()
export class GetAllUsersController extends BaseController<GetUserResponse[]> {
  @post('/users')
  @use(requireAuth)
  @use(currentUser)
  public async getAllUsers(req: Request, res: Response<GetUserResponse[]>, next: NextFunction) {
    try {
      const query = new GetAllUsersQuery(req.body.filters, req.currentUser!.id);

      const users = await this.queryBus.ask(query);

      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }
}
