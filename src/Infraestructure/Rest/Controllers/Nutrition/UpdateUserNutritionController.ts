import { Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../../../Application/CommandBus/CommandBus';
import { UpdateUserNutritionCommand } from '../../../../Domain/Commands/Nutrition/UpdateUserNutritionCommand';
import { currentUser, requireAuth } from '../../../../middlewares/auth';
import { Controller } from '../../Decorators/controller';
import { put } from '../../Decorators/routes';
import { use } from '../../Decorators/use';

@Controller()
export class UpdateUserNutritionController {
  @put('/nutrition')
  @use(requireAuth)
  @use(currentUser)
  public async updateUserNutrition(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const commandBus = new CommandBus();
      await commandBus.execute(
        new UpdateUserNutritionCommand(
          req.body.weight,
          req.body.height,
          req.body.objective,
          req.body.age,
          req.body.activity,
          req.body.gender,
          req.currentUser!.id
        )
      );

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}
