import { Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../../../Application/CommandBus/CommandBus';
import { CreateUserCommand } from '../../../../Domain/Commands/User/CreateUserCommand';
import { UpdateUserNotificationsCommand } from '../../../../Domain/Commands/User/UpdateUserNotificationsCommand';
import { currentUser, requireAuth } from '../../../../middlewares/auth';
import { Controller } from '../../Decorators/controller';
import { post } from '../../Decorators/routes';
import { use } from '../../Decorators/use';

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
