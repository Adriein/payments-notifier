import { Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../../../Application/CommandBus/CommandBus';
import { CreatePricingCommand } from '../../../../Domain/Commands/AppConfig/CreatePricingCommand';
import { currentUser, requireAuth } from '../../../../middlewares/auth';
import { Controller } from '../../Decorators/controller';
import { put } from '../../Decorators/routes';
import { use } from '../../Decorators/use';

@Controller()
export class ModifyAppConfigController {
  @put('/appConfig')
  @use(requireAuth)
  @use(currentUser)
  public async createPricing(req: Request, res: Response, next: NextFunction) {
    try {
      const commandBus = new CommandBus();
      await commandBus.execute(
        new CreatePricingCommand(
          req.body.name,
          req.body.duration,
          req.body.price,
          req.currentUser!.id
        )
      );

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}
