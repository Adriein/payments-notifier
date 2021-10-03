import { Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../../../Application/CommandBus/CommandBus';
import { UpdateUserNotificationsCommand } from '../../../../Domain/Commands/User/UpdateUserNotificationsCommand';
import { currentUser, requireAuth } from '../../../../middlewares/auth';
import { Controller } from '../../../../Shared/Infrastructure/Decorators/controller';
import { post } from '../../../../Shared/Infrastructure/Decorators/routes';
import { use } from '../../../../Shared/Infrastructure/Decorators/use';

@Controller()
export class CreateUserController {
  @post('/users/config/notifications')
  @use(requireAuth)
  @use(currentUser)
  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const commandBus = new CommandBus();
      await commandBus.execute(
        new UpdateUserNotificationsCommand(
          req.body.email,
          req.body.config.sendWarnings
        )
      );

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}
