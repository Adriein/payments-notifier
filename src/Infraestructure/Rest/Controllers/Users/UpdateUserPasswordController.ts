import { Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../../../Application/CommandBus/CommandBus';
import { UpdateUserPasswordCommand } from '../../../../Domain/Commands/User/UpdateUserPasswordCommand';
import { currentUser, requireAuth } from '../../../../Shared/Infrastructure/Middlewares/auth';
import { Controller } from '../../../../Shared/Infrastructure/Decorators/controller';
import { post } from '../../../../Shared/Infrastructure/Decorators/routes';
import { use } from '../../../../Shared/Infrastructure/Decorators/use';

@Controller()
export class UpdateUserPasswordController {
  @post('/users/password')
  @use(requireAuth)
  @use(currentUser)
  public async updateUserPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const commandBus = new CommandBus();
      await commandBus.execute(
        new UpdateUserPasswordCommand(
          req.body.currentUser!.id,
          req.body.oldPassword,
          req.body.newPassword
        )
      );

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}
