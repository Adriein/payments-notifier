import { Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../../../Application/CommandBus/CommandBus';
import { CreateUserCommand } from '../../../../Domain/Commands/User/CreateUserCommand';
import { currentUser, requireAuth } from '../../../../middlewares/auth';
import { post } from '../../Decorators/routes';
import { use } from '../../Decorators/use';

export class CreateUserController {
  @post('/users')
  @use(requireAuth)
  @use(currentUser)
  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const commandBus = new CommandBus();
      await commandBus.execute(
        new CreateUserCommand(
          req.body.username,
          req.body.email,
          req.body.pricing,
          req.body.lastPaymentDate,
          req.currentUser!.id!
        )
      );

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}
