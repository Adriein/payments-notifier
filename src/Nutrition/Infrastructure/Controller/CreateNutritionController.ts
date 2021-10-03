import { Request, Response, NextFunction } from 'express';
import { Controller } from '../../../Shared/Infrastructure/Decorators/controller';
import { post } from '../../../Shared/Infrastructure/Decorators/routes';
import { use } from '../../../Shared/Infrastructure/Decorators/use';
import { currentUser, requireAuth } from '../../../middlewares/auth';
import { BaseController } from '../../../Shared/Infrastructure/BaseController';
import { CreateNutritionCommand } from '../../Domain/Commands/CreateNutritionCommand';

@Controller()
export class CreateNutritionController extends BaseController<void> {
  @post('/nutrition')
  @use(requireAuth)
  @use(currentUser)
  public async createNutrition(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await this.commandBus.dispatch(
        new CreateNutritionCommand(
          req.body.userId,
          req.body.weight,
          req.body.height,
          req.body.age,
          req.body.gender
        )
      );

      res.status(200).send({});
    } catch (error) {
      next(error);
    }
  }
}
