import { Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../../../Application/CommandBus/CommandBus';
import { DeleteUserCommand } from '../../../../Domain/Commands/User/DeleteUserCommand';
import { currentUser, requireAuth } from '../../../../middlewares/auth';
import { del } from '../../Decorators/routes';
import { use } from '../../Decorators/use';

export class CreateUserController {
  @del('/users/:email')
  @use(requireAuth)
  @use(currentUser)
  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const commandBus = new CommandBus();
      await commandBus.execute(new DeleteUserCommand(req.params.email));
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}
