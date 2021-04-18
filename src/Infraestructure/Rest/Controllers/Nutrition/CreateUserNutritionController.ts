import { Request, Response, NextFunction } from 'express';
import { CommandBus } from '../../../../Application/CommandBus/CommandBus';
import { CreateUserNutritionCommand } from '../../../../Domain/Commands/Nutrition/CreateUserNutritionCommand';
import { Controller } from '../../Decorators/controller';
import { post } from '../../Decorators/routes';

@Controller()
export class CreateUserNutritionController {
  @post('/nutrition')
  public async createUserNutrition(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const commandBus = new CommandBus();
      await commandBus.execute(
        new CreateUserNutritionCommand(
          req.body.weight,
          req.body.height,
          req.body.objective,
          req.body.age,
          req.body.activity
        )
      );

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}
