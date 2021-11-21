import { Request, Response, NextFunction } from 'express';
import { Controller } from "../../../../Shared/Infrastructure/Decorators/controller";
import { BaseController } from "../../../../Shared/Infrastructure/BaseController";
import { use } from "../../../../Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "../../../../Shared/Infrastructure/Middlewares/auth";
import { put } from "../../../../Shared/Infrastructure/Decorators/routes";
import { UpdateUserNotificationsCommand } from "../../Domain/Command/UpdateUserNotificationsCommand";

@Controller()
export class UpdateUserNotificationsController extends BaseController<void> {
  @put('/users/config/notifications')
  @use(requireAuth)
  @use(currentUser)
  public async updateUserNotifications(req: Request, res: Response, next: NextFunction) {
    try {
      await this.commandBus.dispatch(
        new UpdateUserNotificationsCommand(
          req.body.id,
          req.body.sendWarnings,
        )
      );

      res.status(200).send({});
    } catch (error) {
      next(error);
    }
  }
}
