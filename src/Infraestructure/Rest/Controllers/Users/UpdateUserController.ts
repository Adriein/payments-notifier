import { Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../../../Application/CommandBus/CommandBus';
import { UpdateUserCommand } from '../../../../Domain/Commands/User/UpdateUserCommand';
import { currentUser, requireAuth } from '../../../../middlewares/auth';
import { Controller } from '../../../../Shared/Infrastructure/Decorators/controller';
import { put } from '../../../../Shared/Infrastructure/Decorators/routes';
import { use } from '../../../../Shared/Infrastructure/Decorators/use';

@Controller()
export class UpdateUserController {
  @put('/users')
  @use(requireAuth)
  @use(currentUser)
  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const commandBus = new CommandBus();
      await commandBus.execute(
        new UpdateUserCommand(
          req.body.id,
          req.body.username,
          req.body.email,
          req.body.pricing,
          req.body.lastPaymentDate,
          req.currentUser!.id
        )
      );

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}
