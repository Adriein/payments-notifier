import { Request, Response, NextFunction } from 'express';
import { Controller } from '../../../Infraestructure/Rest/Decorators/controller';
import { post } from '../../../Infraestructure/Rest/Decorators/routes';
import { use } from '../../../Infraestructure/Rest/Decorators/use';
import { currentUser, requireAuth } from '../../../middlewares/auth';
import { BaseController } from '../../../Shared/Infrastructure/BaseController';
import { CreateDietCommand } from '../../Domain/Command/CreateDietCommand';

@Controller()
export class CreateDietController extends BaseController<void> {
  @post('/diet')
  @use(requireAuth)
  @use(currentUser)
  public async creaDiet(req: Request, res: Response, next: NextFunction) {
    try {
      await this.commandBus.dispatch(
        new CreateDietCommand(
          req.body.name,
          req.body.nutritionId,
          req.body.objective,
          req.body.kcalChange
        )
      );

      res.status(200).send({});
    } catch (error) {
      next(error);
    }
  }
}