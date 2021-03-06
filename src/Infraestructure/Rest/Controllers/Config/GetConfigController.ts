import { Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../../../Application/CommandBus/CommandBus';
import { ReadAppConfigCommand } from '../../../../Domain/Commands/AppConfig/ReadAppConfigCommand';
import { AppConfig } from '../../../../Domain/Entities/AppConfig.entity';
import { currentUser, requireAuth } from '../../../../middlewares/auth';
import { Controller } from '../../Decorators/controller';
import { get } from '../../Decorators/routes';
import { use } from '../../Decorators/use';

@Controller()
export class GetConfigController {
  @get('/appConfig')
  @use(requireAuth)
  @use(currentUser)
  public async getConfig(req: Request, res: Response, next: NextFunction) {
    try {
      const commandBus = new CommandBus();
      const appConfig = (await commandBus.execute(
        new ReadAppConfigCommand(req.currentUser!.id)
      )) as AppConfig;

      res.status(200).send(appConfig.serialize());
    } catch (error) {
      next(error);
    }
  }
}
