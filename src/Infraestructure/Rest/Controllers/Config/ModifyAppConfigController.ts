import { Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../../../Application/CommandBus/CommandBus';
import { CreatePricingCommand } from '../../../../Domain/Commands/AppConfig/CreatePricingCommand';
import { ModifyAppConfigCommand } from '../../../../Domain/Commands/AppConfig/ModifyAppConfigCommand';
import { currentUser, requireAuth } from '../../../../middlewares/auth';
import { Controller } from '../../Decorators/controller';
import { put } from '../../Decorators/routes';
import { use } from '../../Decorators/use';

@Controller()
export class ModifyAppConfigController {
  @put('/appConfig')
  @use(requireAuth)
  @use(currentUser)
  public async modifyAppConfig(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const commandBus = new CommandBus();
      await commandBus.execute(
        new ModifyAppConfigCommand(
          req.body.warningDelay,
          req.body.emailContent,
          req.currentUser!.id
        )
      );

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}
