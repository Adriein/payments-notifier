import { Request, Response, NextFunction } from 'express';
import { Controller } from "../../../../Shared/Infrastructure/Decorators/controller";
import { BaseController } from "../../../../Shared/Infrastructure/BaseController";
import { use } from "../../../../Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "../../../../middlewares/auth";
import { get } from "../../../../Shared/Infrastructure/Decorators/routes";
import { GetAllUsersQuery } from "../../Domain/Query/GetAllUsersQuery";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";

@Controller()
export class UpdateUserNotificationsController extends BaseController<void> {
  @get('/users')
  @use(requireAuth)
  @use(currentUser)
  public async updateUserNotifications(req: Request, res: Response, next: NextFunction) {

    const criteria = new Criteria();
    try {
      await this.queryBus.ask(
        new GetAllUsersQuery(criteria)
      );

      res.status(200).send({});
    } catch (error) {
      next(error);
    }
  }
}
