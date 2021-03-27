import { Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../../../Application/CommandBus/CommandBus';
import { CreateAppConfigCommand } from '../../../../Domain/Commands/AppConfig/CreateAppConfigCommand';
import { currentUser, requireAuth } from '../../../../middlewares/auth';
import { Controller } from '../../Decorators/controller';
import { post } from '../../Decorators/routes';
import { use } from '../../Decorators/use';

@Controller()
export class CreateConfigController {
  @post('/appConfig')
  @use(requireAuth)
  @use(currentUser)
  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const commandBus = new CommandBus();
      await commandBus.execute(
        new CreateAppConfigCommand(
          req.body.pricing,
          req.body.warningDelay,
          req.body.defaulterDelay,
          req.body.emailContent,
          req.body.currentUser!.id
        )
      );

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}
