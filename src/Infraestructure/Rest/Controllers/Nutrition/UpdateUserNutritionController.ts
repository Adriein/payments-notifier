import { Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../../../Application/CommandBus/CommandBus';
import { UpdateUserNutritionCommand } from '../../../../Domain/Commands/Nutrition/UpdateUserNutritionCommand';
import { Controller } from '../../Decorators/controller';
import { put } from '../../Decorators/routes';

@Controller()
export class UpdateUserNutritionController {
  @put('/nutrition')
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
          req.body.gender
        )
      );

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}
